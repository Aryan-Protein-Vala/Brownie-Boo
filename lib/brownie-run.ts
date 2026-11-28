export const floor = 202;
export const runnerGroundY = 225;
export const runnerLegStroke = 9;

export function runnerLegPath(leg: 0 | 1, distance: number, airborne = false) {
  const hipX = leg === 0 ? 152 : 92;
  const hipY = leg === 0 ? 187 : 188;
  const stride = (distance / 115 + leg * 0.5) % 1;
  const onGround = stride < 0.5;
  const step = onGround ? 1 - 4 * stride : 4 * stride - 3;
  const lift = onGround ? 0 : 25 * Math.sin((stride - 0.5) * 2 * Math.PI);
  const heelX = hipX + (airborne ? (leg === 0 ? -12 : 17) : step * 20);
  const heelY = runnerGroundY - runnerLegStroke / 2 - (airborne ? 19 : lift);
  const kneeX = hipX + (heelX - hipX) * 0.45 - 5 - lift * 0.24;
  const kneeY = (hipY + heelY) / 2 + 4;
  return `M${hipX} ${hipY}Q${kneeX} ${kneeY} ${heelX} ${heelY}h10`;
}

const obstacles = {
  tins: { width: 42, height: 42 },
  spool: { width: 52, height: 30 },
  stack: { width: 48, height: 53 },
} as const;

export type ObstacleKind = keyof typeof obstacles;
export type Obstacle = {
  id: number;
  kind: ObstacleKind;
  x: number;
  width: number;
  height: number;
  crumb: boolean;
  cleared: boolean;
};

const route: ObstacleKind[] = [
  "tins",
  "spool",
  "stack",
  "spool",
  "tins",
  "stack",
];
const jumpSpeed = 465;
const gravity = 1270;

export function newRun() {
  return {
    distance: 0,
    score: 0,
    bonus: 0,
    height: 0,
    velocity: 0,
    elapsed: 0,
    buffer: 0,
    count: 0,
    nextObstacle: 0.68,
    objects: [] as Obstacle[],
  };
}

export type Run = ReturnType<typeof newRun>;

export function requestJump(run: Run) {
  run.buffer = 0.11;
}

export function runnerX(width: number) {
  return Math.max(33, Math.min(103, width * 0.135));
}

export function advanceRun(run: Run, seconds: number, width: number) {
  const dt = Math.min(seconds, 0.035);
  if (dt <= 0) return true;
  const speed = 284 + Math.min(226, run.elapsed * 5.1);
  run.elapsed += dt;
  run.distance += speed * dt;

  if (run.buffer > 0 && run.height === 0) {
    run.velocity = jumpSpeed;
    run.buffer = 0;
  }
  run.buffer = Math.max(0, run.buffer - dt);
  if (run.height > 0 || run.velocity > 0) {
    run.velocity -= gravity * dt;
    run.height = Math.max(0, run.height + run.velocity * dt);
    if (run.height === 0) run.velocity = 0;
  }

  if (run.elapsed >= run.nextObstacle) {
    const index = run.count++;
    const kind = route[index % route.length];
    run.objects.push({
      id: index,
      kind,
      x: width + 20,
      ...obstacles[kind],
      crumb: index % 3 === 1,
      cleared: false,
    });
    run.nextObstacle = run.elapsed + 1.18 + (index % 4) * 0.12;
  }

  const playerLeft = runnerX(width) + 15;
  const playerRight = playerLeft + 43;
  for (const object of run.objects) {
    object.x -= speed * dt;
    const overlaps =
      object.x + 4 < playerRight && object.x + object.width - 4 > playerLeft;
    if (overlaps && object.crumb && run.height > 26 && run.height < 94) {
      object.crumb = false;
      run.bonus += 12;
    }
    if (overlaps && run.height + 7 < object.height) return false;
    if (!object.cleared && object.x + object.width < playerLeft) {
      object.cleared = true;
      run.bonus += 5;
    }
  }
  run.objects = run.objects.filter(
    ({ x, width: objectWidth }) => x > -objectWidth - 12,
  );
  run.score = Math.floor(run.distance / 25) + run.bonus;
  return true;
}

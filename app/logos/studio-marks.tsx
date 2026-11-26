import styles from "./logos.module.css";
import studio from "./studio.module.css";

export const studioDirections = [
  {
    id: "soft-set",
    name: "Soft Set",
    note: "The two o’s press into each other like soft fudge. The letters are drawn from scratch, right down to the crooked exclamation.",
    motion: true,
  },
  {
    id: "fudge-pull",
    name: "Fudge Pull",
    note: "The original boo! under a hand-lettered brownie. A few strands of chocolate stretch between the two as they settle.",
    motion: true,
  },
  {
    id: "the-fold",
    name: "The Fold",
    note: "Two B’s folded from one ribbon. The monogram works on its own for a seal, avatar, or tiny corner of a wrapper.",
    motion: true,
  },
  {
    id: "sunday-best",
    name: "Sunday Best",
    note: "A dressier dessert-counter mark, with a sweeping B and two o’s that share a hairline.",
    motion: false,
  },
] as const;

export type StudioDirection = (typeof studioDirections)[number];

export function StudioMark({ id }: { id: StudioDirection["id"] }) {
  return (
    <svg className={`${styles.logo} ${studio.mark}`} viewBox="0 0 320 176" aria-hidden="true">
      {id === "soft-set" && <g transform="translate(-13 0)">
        <text className={studio.pressLabel} x="173" y="38" textAnchor="middle" fontSize="16" fontWeight="760" letterSpacing="4.8">BROWNIE</text>
        <path className={studio.pressB} fillRule="evenodd" d="M42 60C42 49 49 46 60 47C71 48 76 52 75 62L74 83C80 74 90 72 101 74C119 76 129 89 128 108C127 133 108 149 81 149C54 149 40 136 40 113C40 89 42 74 42 60ZM71 110C70 120 73 126 81 127C89 128 95 121 95 111C95 102 91 97 84 97C77 97 72 102 71 110Z" />
        <path className={studio.pressO} fillRule="evenodd" d="M126 109C128 87 142 74 167 74C183 74 194 80 200 89C208 79 220 75 235 75C259 74 275 90 274 112C273 135 257 150 232 149C216 149 205 144 198 135C190 145 178 149 162 148C139 147 123 133 126 109ZM153 109C152 119 156 125 164 125C171 126 176 120 177 111C178 102 174 96 167 96C159 96 154 101 153 109ZM219 111C218 120 223 125 230 125C238 125 243 120 244 111C245 102 241 97 233 97C225 97 220 102 219 111Z" />
        <g transform="translate(2 -1) rotate(7 294 104)">
          <path className={studio.pressBang} d="M282 54C283 47 291 45 302 46C312 47 314 50 312 58L301 107C300 113 296 115 289 114C283 113 281 110 281 104Z" />
          <path className={studio.pressDot} d="M276 135C277 126 283 121 292 122C301 123 306 129 305 136C304 144 298 149 289 149C281 149 275 143 276 135Z" />
        </g>
      </g>}
      {id === "fudge-pull" && <g transform="translate(-21 0)">
        <path className={studio.pullThreads} d="M96 56C102 62 103 67 103 76C105 66 107 63 116 57M205 57C212 63 213 67 212 76C216 68 221 62 226 58" fill="currentColor" />
        <g className={studio.pullTop} fill="none" stroke="currentColor" strokeWidth="4.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M77 54L79 25C92 22 102 24 102 31C102 37 94 39 80 39C94 37 105 39 105 46C105 54 94 56 77 54Z" />
          <path d="M112 55L113 25C126 23 137 26 136 33C136 40 125 40 113 40M123 40L138 55" />
          <path d="M172 39C171 49 165 56 155 56C145 56 140 50 141 41C142 30 149 24 159 24C168 24 173 30 172 39Z" />
          <path d="M178 25L184 55L194 42L203 55L213 25" />
          <path d="M220 55L220 25L245 55L246 25" />
          <path d="M257 25L255 55M270 25L268 55L291 54M270 25L292 24M269 40L287 40" />
        </g>
        <text className={`${styles.boo} ${studio.pullBoo}`} x="181" y="146" textAnchor="middle" fontSize="116">boo!</text>
      </g>}
      {id === "the-fold" && <>
        <g transform="translate(160 77) rotate(-12)">
          <path className={studio.foldBack} fillRule="evenodd" d="M-7-47H22C46-47 53-33 52-23C51-12 44-5 34-2C46 1 52 9 52 20C52 34 40 44 22 44H-7ZM12-29V-11H20C28-11 32-15 32-21C32-26 28-29 20-29ZM12 6V26H23C31 26 34 22 34 16C34 10 29 6 22 6Z" />
          <path className={studio.foldFront} fillRule="evenodd" d="M7 47H-22C-46 47-53 33-52 23C-51 12-44 5-34 2C-46-1-52-9-52-20C-52-34-40-44-22-44H7ZM-12 29V11H-20C-28 11-32 15-32 21C-32 26-28 29-20 29ZM-12-6V-26H-23C-31-26-34-22-34-16C-34-10-29-6-22-6Z" />
        </g>
        <text className={studio.foldLabel} x="160" y="148" textAnchor="middle" fontSize="22" letterSpacing="2.8" fontWeight="700">BROWNIE BOO!</text>
      </>}
      {id === "sunday-best" && <>
        <text x="157" y="37" fontSize="15" textAnchor="middle" fontWeight="680" letterSpacing="4.7">BROWNIE</text>
        <path fillRule="evenodd" d="M81 59C64 57 52 63 48 74C46 79 47 83 45 84C42 85 41 80 43 75C49 62 61 55 80 54C101 51 126 50 131 65C135 78 122 88 106 92C127 92 134 101 130 114C126 131 105 141 84 143C61 145 48 139 49 128C50 120 58 114 66 115L65 117C60 118 57 122 57 127C56 134 65 137 75 135C84 119 93 81 96 62C92 60 86 59 81 59ZM111 62C109 73 106 83 104 90C114 88 118 80 119 73C120 67 117 63 111 62ZM103 94C98 114 91 130 84 136C99 134 112 125 115 112C118 101 113 95 103 94Z" />
        <path fillRule="evenodd" d="M166 88C185 87 192 101 187 116C182 132 169 142 153 142C137 142 129 131 133 117C138 99 151 90 166 88ZM166 91C158 92 151 102 147 116C144 126 144 139 152 139C160 139 168 127 172 114C175 103 175 90 166 91ZM221 88C240 87 247 101 242 116C237 132 223 142 208 142C192 142 183 131 188 117C192 100 205 90 221 88ZM221 91C213 92 205 102 202 116C199 126 199 139 207 139C215 139 223 127 227 114C230 103 230 90 221 91Z" />
        <path className={studio.serifJoin} d="M181 101C191 105 200 99 204 94M67 142C94 156 149 153 175 147C203 140 220 142 231 148" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M261 68C263 57 268 53 275 54C281 54 282 59 280 66L260 119L257 118ZM258 125C264 125 267 130 265 135C263 140 256 143 252 140C247 137 247 133 250 129C252 127 255 125 258 125Z" />
      </>}
    </svg>
  );
}

export default function Logo() {
  return (
    <a className="eco-logo" href="#top" aria-label="Ruang Tumbuh beranda">
      <span>
        <svg
          viewBox="90 35 240 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ width: "26px", height: "26px", transform: "scale(1.15)" }}
        >
          {/* Head base */}
          <ellipse cx="170" cy="139" rx="77" ry="73" fill="#263E38" />
          <path d="M128 111c-17 31-11 66 17 86 30 2 51-13 62-39-7-31-36-53-79-47Z" fill="#FAF6E9" />

          {/* Hornbill beak */}
          <path
            d="M170 130c43-27 105-19 149 8-32 8-59 27-95 51-28 19-55 4-50-23Z"
            fill="#E9A43B"
            stroke="#7A4938"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M177 153c45-5 91-2 129-13-28 12-52 31-83 49-24 14-43 4-48-10Z" fill="#F5C354" />

          {/* Casque */}
          <path
            d="M176 126c30-36 82-43 111-9-39-3-67 8-93 25Z"
            fill="#D88732"
            stroke="#7A4938"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M195 122c20-17 46-22 65-14-21 2-38 8-55 19Z" fill="#F5C354" />

          {/* Eye */}
          <circle cx="158" cy="133" r="14" fill="#173B30" />
          <circle cx="153" cy="128" r="4" fill="white" />
          <circle cx="134" cy="161" r="11" fill="#EFA88B" opacity="0.6" />

          {/* Explorer Hat */}
          <path d="M104 101c26-16 86-25 126-4l-10 16c-39-12-77-8-111 4Z" fill="#8D5B4C" />
          <path
            d="M126 93c1-48 70-58 87-3l-6 13c-31-10-56-8-81 2Z"
            fill="#B9825F"
            stroke="#684437"
            strokeWidth="4"
          />
          <path d="M125 86c29 8 59 7 88-1l-1 14c-31 8-58 8-87 1Z" fill="#2D6A4F" />
          <path d="M184 74c10-8 21-11 34-7-8 12-18 19-32 20Z" fill="#52B788" />
        </svg>
      </span>
      <div>
        <strong>Rimba</strong>
        <small>SIAGA BENCANA</small>
      </div>
    </a>
  );
}

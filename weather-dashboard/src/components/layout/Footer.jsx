const Footer = () => (
  <footer className="mt-16 py-6 border-t border-[#E5E7EB] text-center animate-accordion-up">
    <p className="text-sm text-[#6B7280]">
      🌦️ Built with <span className="text-[#2563EB] font-semibold">React</span>{" "}
      & Tailwind CSS ·{" "}
      <a
        href="https://openweathermap.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2563EB] hover:underline"
      >
        OpenWeather API
      </a>
    </p>
    <p className="mt-2 text-xs text-[#9CA3AF]">
      © {new Date().getFullYear()} Weather Dashboard. All rights reserved.
    </p>
  </footer>
);

export default Footer;

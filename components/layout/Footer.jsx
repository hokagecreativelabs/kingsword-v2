import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import NewsletterForm from "../../components/NewsletterForm";

const sections = [
  {
    title: "About Us",
    items: [
      { name: "Our History", a: "/about" },
      { name: "Leadership", a: "/about" },
      { name: "Beliefs", a: "/about" },
    ],
  },
  {
    title: "Locations",
    items: [
      { name: "Calgary", a: "/locations/calgary" },
      { name: "Toronto", a: "/locations/toronto" },
      { name: "Vancouver", a: "/locations/vancouver" },
    ],
  },
  {
    title: "Connect With Us",
    items: [
      {
        name: "Instagram",
        a: "https://www.instagram.com/kingswordcalgary?igsh=emV6anVob3d1OGly&utm_source=qr",
      },
      {
        name: "Youtube",
        a: "https://www.youtube.com/@kingswordcalgary8172",
      },
      {
        name: "Facebook",
        a: "https://www.facebook.com/share/ukpMwG5DDHkyCW4G/?mibextid=LQQJ4d",
      },
    ],
  },
];

const items = [
  {
    name: "Facebook",
    icon: FaFacebook,
    a: "https://www.facebook.com/share/ukpMwG5DDHkyCW4G/?mibextid=LQQJ4d",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    a: "https://www.instagram.com/kingswordcalgary?igsh=emV6anVob3d1OGly&utm_source=qr",
  },
  {
    name: "Youtube",
    icon: FaYoutube,
    a: "https://www.youtube.com/@kingswordcalgary8172",
  },
];

const Footer = () => {
  return (
    <footer className="w-full mt-24 bg-black text-gray-300 py-8 px-2">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="font-bold uppercase pt-2">{section.title}</h3>
            <ul>
              {section.items.map((item, i) =>
                item.a.startsWith("http") ? (
                  <li
                    key={i}
                    className="py-1 text-gray-500 hover:text-white cursor-pointer"
                  >
                    <a
                      href={item.a}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  </li>
                ) : (
                  <li
                    key={i}
                    className="py-1 text-gray-500 hover:text-white cursor-pointer"
                  >
                    <a href={item.a}>{item.name}</a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}

        {/* Client-side interactive component */}
        <NewsletterForm />
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">KingsWord Canada. All rights reserved</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {items.map((item, index) => (
            <a
              target="_blank"
              aria-label={item.name}
              href={item.a}
              key={index}
              className="hover:text-white"
            >
              <item.icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

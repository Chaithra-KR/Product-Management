import { RiShoppingCart2Line } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";

export default function Icons({
  path = "home",
  color = "#e8eaed",
  style = {},
  className = "w-6 h-6",
}) {
  const iconMap = {
    cart: (
      <RiShoppingCart2Line color={color} style={style} className={className} />
    ),
    heart: (
      <IoIosHeartEmpty color={color} style={style} className={className} />
    ),
    user: <FiUser style={style} className={className} />,
    email: <MdOutlineEmail style={style} className={className} />,
    lock: <GoLock style={style} className={className} />,
  };

  return iconMap[path] || null;
}

import { RiShoppingCart2Line } from "react-icons/ri";
import {
  IoIosCloseCircleOutline,
  IoIosHeart,
  IoIosHeartEmpty,
  IoMdAdd,
} from "react-icons/io";
import { FiMinus, FiUser } from "react-icons/fi";
import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdOutlineEmail,
} from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";

export default function Icons({
  path = "home",
  style = {},
  className = "w-6 h-6",
}) {
  const iconMap = {
    cart: <RiShoppingCart2Line style={style} className={className} />,
    heart: <IoIosHeartEmpty style={style} className={className} />,
    "heart-filled": <IoIosHeart style={style} className={className} />,
    user: <FiUser style={style} className={className} />,
    email: <MdOutlineEmail style={style} className={className} />,
    lock: <GoLock style={style} className={className} />,
    right: <MdChevronRight style={style} className={className} />,
    left: <MdChevronLeft style={style} className={className} />,
    down: <MdKeyboardArrowDown style={style} className={className} />,
    check: <FaCheck style={style} className={className} />,
    plus: <IoMdAdd style={style} className={className} />,
    minus: <FiMinus style={style} className={className} />,
    "round-close": (
      <IoIosCloseCircleOutline style={style} className={className} />
    ),
    "image-plus": <LuImagePlus style={style} className={className} />,
  };

  return iconMap[path] || null;
}

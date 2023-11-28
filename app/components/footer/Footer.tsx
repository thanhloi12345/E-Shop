import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="text-slate-700 bg-slate-50 text-sm mt-16 border-t-[1px] border-t-slate-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Danh mục cửa hàng</h3>
            <Link href={`#`}>Phones</Link>
            <Link href={`#`}>Laptops</Link>
            <Link href={`#`}>Desktops</Link>
            <Link href={`#`}>Watches</Link>
            <Link href={`#`}>Tvs</Link>
            <Link href={`#`}>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Dịch vụ khách hàng</h3>
            <Link href={`#`}>Liên hệ chúng tôi</Link>
            <Link href={`#`}>chính sách vận chuyển</Link>
            <Link href={`#`}>Watches</Link>
            <Link href={`#`}>FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">Về chúng tôi</h3>
            <p className="mb-2">
              Tại cửa hàng điện tử của chúng tôi, chúng tôi luôn cung cấp những
              sản phẩm mới nhất cũng như phụ kiện tốt nhất cho khách hàng của
              chúng tôi. Với đa dạng sự lựa chọn từ phones, TVs, laptops,
              watches, and accessories
            </p>
            <p>
              &copy; {new Date().getFullYear()} Smart-Shop. All rights reserved.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Kênh Liện Hệ</h3>
            <div className="flex gap-2">
              <Link href={`#`}>
                <MdFacebook size={24} />
              </Link>
              <Link href={`#`}>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href={`#`}>
                <AiFillInstagram size={24} />
              </Link>
              <Link href={`#`}>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

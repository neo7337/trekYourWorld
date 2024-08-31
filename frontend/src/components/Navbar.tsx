import { StyleClass } from "primereact/styleclass";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import { MutableRefObject, ReactNode, useRef } from "react";
import { Link } from "react-router-dom";

type NodeRef = MutableRefObject<ReactNode>;

const Navbar: React.FC = () => {
    const menuRef = useRef<HTMLElement | null>(null);

    return (
        <div className="mx-0 flex align-items-center justify-content-between relative lg:static">
            <Link to={'/'}>
                <span className="flex align-items-center">
                    <img
                    src={"/logo.png"}
                    alt="trekYourWorld"
                    height="50"
                    className="mr-0 lg:mr-2"
                    />
                </span>
            </Link>
            <StyleClass
                nodeRef={menuRef as NodeRef}
                selector="@next"
                enterClassName="hidden"
                leaveToClassName="hidden"
                hideOnOutsideClick
            >
                <i
                    ref={menuRef}
                    className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-700"
                ></i>
            </StyleClass>
            <div
                className={classNames(
                    "align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2"
                )}
                style={{ top: "100%" }}
            >
                <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                </ul>
                <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                    <Link to={'/contact-us'}>
                        <span
                            className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-white-alpha-90 text-900 font-medium line-height-3"
                        >
                            <span>Contact Us</span>
                            <Ripple />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

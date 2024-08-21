import { StyleClass } from "primereact/styleclass";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import { MutableRefObject, ReactNode, useRef } from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Link } from "react-router-dom";

type NodeRef = MutableRefObject<ReactNode>;

const Navbar: React.FC = () => {
    const menuRef = useRef<HTMLElement | null>(null);

    const contactUsConfirm = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: () => { },
            reject: () => { }
        });
    };

    return (
        <div className="mx-0 flex align-items-center justify-content-between relative lg:static">
            <ConfirmDialog />
            <Link to={'/'}>
                <span className="flex align-items-center">
                    {/* <img
                    src={""}
                    alt="trekYourWorld Logo"
                    height="50"
                    className="mr-0 lg:mr-2"
                    /> */}
                    <span className="text-900 font-medium text-2xl line-height-3 mr-8">
                        trekYourWorld
                    </span>
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
                    "align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2"
                )}
                style={{ top: "100%" }}
            >
                <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                    <li>
                        <span
                            onClick={contactUsConfirm}
                            className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                        >
                            <span>Contact Us</span>
                            <Ripple />
                        </span>
                    </li>
                </ul>
                <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                    <Button
                        label="Login"
                        text
                        rounded
                        className="border-none font-light line-height-2 text-blue-500"
                    ></Button>
                    <Button
                        label="Register"
                        rounded
                        className="border-none ml-5 font-light line-height-2 text-white"
                    ></Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

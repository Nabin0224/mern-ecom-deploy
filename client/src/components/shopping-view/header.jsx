import {
  CircleUserRound,
  House,
  LogOut,
  LogOutIcon,
  ShoppingCart,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { logOut } from "../../../store/auth-slice/index";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "../../../store/shop/cart-slice/index";
import { Label } from "../ui/label";
import AuthPopup from "./login-card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import "./Navbar.css";

function MenuItems({ setOpenMobileCartSheet }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to determine if the link is active
  // const isActive = (path, category = "") => {
  //   const currentPath = location.pathname;
  //   const currentCategory = searchParams.get("category");

  //   // Check if the path matches and category matches (if provided)
  //   if (category) {
  //     return currentPath === path && currentCategory === category;
  //   }
  //   return currentPath === path;
  // };

  // Handle navigation
  function handleNavigate(menuItem) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      menuItem.id !== "home" &&
      menuItem.id !== "products" &&
      menuItem.id !== "search"
        ? {
            category: [menuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${menuItem.id}`));
      setOpenMobileCartSheet(false);
    } else {
      navigate(menuItem.path);
      setOpenMobileCartSheet(false);
    }
  }

  return (
    <>
      <nav class="navbar">
        <Link to="/">
          <div class="logo">
            <h1>Style Me</h1>
          </div>
        </Link>

        <ul>
          {shoppingViewHeaderMenuItems.map((menuItem) => (
            <li
              onClick={() => handleNavigate(menuItem)}
              className={`text-sm font-medium cursor-pointer transition-all duration-300 relative text-md active:font-bold"
                 
              }`}
              key={menuItem.id}
            >
              {menuItem.label}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function HeaderRightContent({
  openMobileCartSheet,
  setOpenMobileCartSheet = () => {},
}) {
  function handleLogOut() {
    dispatch(logOut());
    navigate("/auth/login");
  }

  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:flex-row lg:item-center flex-col gap-6">
      <Sheet
        open={openCartSheet}
        onOpenChange={() => {
          setOpenCartSheet(false);
          setOpenMobileCartSheet(false);
        }}
      >
        <div className={`${user ? "hidden" : "block"}`}>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex items-center justify-center">
                <User stroke-width="1.3px" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] md:max-w-md">
              <AuthPopup isLogin={isLogin} setIsLogin={setIsLogin} />
            </DialogContent>
          </Dialog>
        </div>
        <Button
          onClick={() => {
            setOpenCartSheet(true);
          }}
          variant="none"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItems?.items?.length > 0 ? (
            <span className="absolute top-[-2px] right-[4px] font-bold text-xs">
              {cartItems?.items?.length}
            </span>
          ) : null}
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
          setOpenCartSheet={setOpenCartSheet}
          setOpenMobileCartSheet={setOpenMobileCartSheet}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className=" bg-black text-white font-extrabold">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" />
              ) : user?.userName ? (
                user.userName[0]
              ) : null}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel className="mb-1">
            {user ? `Logged in as ${user?.userName}` : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              navigate("/account");
              setOpenMobileCartSheet(false);
            }}
          >
            <User className="mr-2 h-4 w-4" /> Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogOut}>
            <LogOutIcon className="mr-2 h-4 w-4" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [openMobileCartSheet, setOpenMobileCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  return (
    <>
      <div className="topHeader">
        <div className="sale">
          <h4>Get upto 30% off on your first purchase</h4>
        </div>
        <div className="shopNow">
          <p>Shop Now</p>
        </div>
      </div>
      <div className="flex">
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* for mobile devices  */}
        <div className="flex w-full  justify-between md:justify-end items-center gap-4 m-4">
          <div class="logo md:hidden">
            <h1>Style Me</h1>
          </div>
          <div className="flex gap-4">
            <Sheet
              open={openCartSheet}
              onOpenChange={() => {
                setOpenCartSheet(false);
                setOpenMobileCartSheet(false);
              }}
            >
              <Button
                class=""
                onClick={() => {
                  setOpenCartSheet(true);
                }}
                variant="none"
                size="icon"
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItems?.items?.length > 0 ? (
                  <span className="absolute top-[-2px] right-[4px] font-bold text-xs">
                    {cartItems?.items?.length}
                  </span>
                ) : null}
                <span className="sr-only">User cart</span>
              </Button>
              <UserCartWrapper
                cartItems={
                  cartItems && cartItems.items && cartItems.items.length > 0
                    ? cartItems.items
                    : []
                }
                setOpenCartSheet={setOpenCartSheet}
                setOpenMobileCartSheet={setOpenMobileCartSheet}
              />
            </Sheet>

            <Sheet
              open={openMobileCartSheet}
              onOpenChange={setOpenMobileCartSheet}
            >
              <SheetTrigger asChild>
                <button class="" onClick={() => setOpenMobileCartSheet(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
                  </svg>
                  <span className="sr-only">Toggle header menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px] ">
                <div className="flex flex-col h-full w-full items-center  gap-6 lg:hidden">
                  <MenuItems setOpenMobileCartSheet={setOpenMobileCartSheet} />
                  <HeaderRightContent
                    setOpenMobileCartSheet={setOpenMobileCartSheet}
                    openMobileCartSheet={openMobileCartSheet}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">{/* <HeaderRightContent /> */}</div>
    </>
  );
};

export default ShoppingHeader;

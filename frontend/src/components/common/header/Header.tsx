"use client";

import Image from "next/image";
import { nav } from "@/constants";
import { Nav } from "@/components/common";
import { useRouter } from "next/navigation";
import { Variant, TextInputRef } from "@/types";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  TextInput,
  DropdownInput,
  LoginModal,
  SignupModal,
  KycStatusModal,
  LogoutConfirmModal,
  UserAvatar,
} from "@/components/common";
import {
  HeaderContainer,
  TopRow,
  BottomRow,
  LeftSection,
  MiddleSection,
  RightSection,
  LogoContainer,
  LogoEmblem,
  LogoText,
  NavContainer,
  NavIcon,
  MobileSearchButton,
  DesktopActions,
  MobileSettingsButton,
  DesktopSearchInput,
  UnderReviewText,
} from "./HeaderStyles";
import { useAuth } from "@/hooks";

interface HeaderProps {
  variant: Variant;
}

const Header: React.FC<HeaderProps> = ({ variant }) => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading: authLoading, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showKyc, setShowKyc] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const textInputRef = useRef<TextInputRef>(null);

  useEffect(() => {
    const isMac = /Mac/i.test(navigator.userAgent);

    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdF = isMac && e.metaKey && e.key === "f";
      const isCtrlF = !isMac && e.ctrlKey && e.key === "f";

      if (isCmdF || isCtrlF) {
        e.preventDefault();
        textInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [sampleSearch, setSampleSearch] = useState("");

  // User profile dropdown options (only shown when authenticated)
  const userProfileOptions = [
    {
      label: "Profile",
      value: "profile",
    },
    {
      label: "Settings",
      value: "settings",
    },
    {
      label: "Logout",
      value: "logout",
    },
  ];

  const handleUserOptionSelect = (value: string) => {
    if (value === "logout") {
      setShowLogoutConfirm(true);
    } else if (value === "profile") {
      router.push("/portfolio");
    } else if (value === "settings") {
      router.push("/portfolio");
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      setShowLogoutConfirm(false);
      router.push("/");
    } catch (error) {
      // Silent fail for logout error
    } finally {
      setIsLoggingOut(false);
    }
  };

  const userDisplayName = user?.fullName || user?.username || user?.email || "";
  const userEmail = user?.email || user?.username || "";

  return (
    <HeaderContainer>
      <TopRow>
        <LeftSection>
          <LogoContainer onClick={() => router.push("/")}>
            <LogoEmblem>
              <Image src="/images/ebecca-logo-emblem.png" alt="Ebecca Logo (Emblem)" fill={true} draggable={false} />
            </LogoEmblem>

            <LogoText>
              <Image src="/images/ebecca-logo-text.png" alt="Ebecca Logo (Text)" fill={true} draggable={false} />
            </LogoText>
          </LogoContainer>
        </LeftSection>

        <MiddleSection>
          <DesktopSearchInput>
            <TextInput
              ref={textInputRef}
              value={sampleSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSampleSearch(e.target.value)}
              name="header-search"
              autoFocus={true}
              placeholder="Search Ebecca for RWA Opportunities"
              height={48}
              padding="8px 8px 8px 16px"
              icon={<Image src="/icons/header/search.svg" alt="Magnifier" width={20} height={20} />}
            />
          </DesktopSearchInput>
          <MobileSearchButton>
            <Button
              variant="primary"
              onClick={() => {
                // Focus search input when clicked
                textInputRef.current?.focus();
              }}
              width={38}
              height={38}
              borderRadius={8}
              icon={<Image src="/icons/header/search.svg" alt="Search" width={20} height={20} />}
            />
          </MobileSearchButton>
        </MiddleSection>

        <RightSection>
          {!authLoading && (
            <>
              {isAuthenticated && user ? (
                <>
                  {/* User Profile Dropdown - Only shown when authenticated */}
                  <DropdownInput
                    options={userProfileOptions}
                    onOptionSelect={handleUserOptionSelect}
                    image={<UserAvatar profileImage={undefined} name={userDisplayName} email={userEmail} size={36} />}
                    label={userDisplayName}
                    hideLabelOnMobile={true}
                    fontSize={16}
                    fontWeight={500}
                    lineHeight={20}
                    padding="6px 12px"
                    borderRadius={12}
                  />

                  <DesktopActions>
                    {/* KYC Status Button */}
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowKyc(true);
                      }}
                      fontSize={14}
                      lineHeight={20}
                      icon={<Image src="/icons/header/under-review.svg" alt="KYC Status" width={16} height={16} />}
                      iconPosition="left"
                      style={{
                        color: "#724409",
                        borderColor: "#FFE082",
                        backgroundColor: "#FFE082",
                      }}
                    >
                      <UnderReviewText>Under Review</UnderReviewText>
                    </Button>
                  </DesktopActions>

                  {/* Mobile Settings Button - Shows KYC icon when authenticated */}
                  <MobileSettingsButton>
                    <Button
                      variant="secondary"
                      onClick={() => setShowKyc(true)}
                      width={38}
                      height={38}
                      borderRadius={8}
                      icon={<Image src="/icons/header/under-review.svg" alt="KYC Status" width={20} height={20} />}
                      style={{
                        color: "#724409",
                        borderColor: "#FFE082",
                        backgroundColor: "#FFE082",
                      }}
                    />
                  </MobileSettingsButton>
                </>
              ) : (
                <>
                  {/* Login Button - Only shown when not authenticated */}
                  <DesktopActions>
                    <Button
                      variant="secondary"
                      onClick={() => setShowLogin(true)}
                      width={110}
                      fontSize={14}
                      lineHeight={20}
                    >
                      Login
                    </Button>
                  </DesktopActions>

                  {/* Mobile Login Button */}
                  <MobileSettingsButton>
                    <Button
                      variant="secondary"
                      onClick={() => setShowLogin(true)}
                      width={38}
                      height={38}
                      borderRadius={8}
                      icon={<Image src="/icons/authenticator.svg" alt="Login" width={20} height={20} />}
                    />
                  </MobileSettingsButton>
                </>
              )}
            </>
          )}
        </RightSection>
      </TopRow>

      {/* Bottom Navigation Row */}
      {variant === "primary" ? (
        <BottomRow>
          {nav.map((link) => (
            <NavContainer key={link.label}>
              <NavIcon>
                <Image width={20} height={20} src={link.icon} alt={link.label} draggable={false} />
              </NavIcon>
              <Nav nav={link} />
            </NavContainer>
          ))}
        </BottomRow>
      ) : null}

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onCreateAccount={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <SignupModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
      <KycStatusModal
        open={showKyc}
        onClose={() => {
          setShowKyc(false);
        }}
      />
      <LogoutConfirmModal
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </HeaderContainer>
  );
};

export default Header;

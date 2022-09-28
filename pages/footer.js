import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

const media = {
  desktop: (...args) => css`
    @media (min-width: 870px) {
      ${css(...args)};
    }
  `,
};

const Footer = styled.footer`
  font-family: nunito-sans, sans-serif;
  text-align: center;

  ${media.desktop`
    text-align: left;
  `}
`;

const HR = styled.div`
  display: none;
  ${media.desktop`
    height: 0;
    padding: 0;
    margin: 0;
    display: block;
    border-bottom: 1px #cacada solid;
  `};
`;

const BottomBar = styled.div`
  max-width: 1280px;
  margin: auto;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  ${media.desktop`
    flex-wrap: nowrap;
    padding: 40px 80px 60px;
    justify-content: space-between;
  `};
`;

const Menu = styled.div`
  margin-bottom: 30px;
  min-width: 50%;
  ${media.desktop`
    min-width: unset;
    margin-bottom: 0;
    margin-right: 40px;
  `}
`;

const MenuHead = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.11;
  color: #2b2738;
`;

const MenuLink = styled.a`
  display: block;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 2;
  color: #2f6cb3;
  ${media.desktop`
    white-space: nowrap;
  `}
`;

const Policy = styled.div`
  width: 100%;
  max-width: 764px;
  font-size: 12px;
  line-height: 1.33;
  color: #2b2738;
  margin: 0 20px;
`;

const PolicyRow = styled.p`
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
`;

const menu = [
  {
    name: "Program Guides",
    links: [
      { title: "PPRA System", url: "www.openfit.com" },
      { title: "Xtend Barre", url: "www.openfit.com" },
      { title: "600 Seconds", url: "www.openfit.com" },
      { title: "Yoga52", url: "www.openfit.com" },
    ],
  },
  {
    name: "About Us",
    links: [
      { title: "PPRA Case Search", url: "www.openfit.com" },

      { title: "Terms and Condition", url: "www.openfit.com" },
      { title: "Privacy Policy", url: "www.openfit.com" },
      { title: "FAQ", url: "www.openfit.com" },
    ],
  },
];

function CustomFooter() {
  return (
    <Footer>
      <HR />
      <BottomBar>
        {menu.map(({ name, links }) => (
          <Menu>
            <MenuHead>{name}</MenuHead>
            {links.map(({ title, url }) => (
              <MenuLink href={url}>{title}</MenuLink>
            ))}
          </Menu>
        ))}

        <Policy>
          <PolicyRow>© 2022 Openfit, LLC. All rights reserved.</PolicyRow>
          <PolicyRow>
            Voluptate aliqua exercitation incididunt proident enim incididunt.
            Incididunt veniam do nisi occaecat incididunt. Dolor proident quis
            ea elit tempor aliqua ea magna cupidatat deserunt ex dolor tempor
            velit.
          </PolicyRow>
          <PolicyRow>
            Consult your physician and follow all safety instructions before
            beginning any exercise program or using any supplement or meal
            replacement product, especially if you have any unique medical
            conditions or needs. The contents on our website are for
            informational purposes only, and are not intended to diagnose any
            medical condition, replace the advice of a healthcare professional,
            or provide any medical advice, diagnosis, or treatment.
          </PolicyRow>
        </Policy>
      </BottomBar>
    </Footer>
  );
}

export default CustomFooter;

import { Tab } from "./Tab";
import { useRouter } from "next/router";
import CardTitleFooter from "../cards/CardTitleFooter";
import React from "react";

function SelectedIndedAndLabel({ slug, keys, router }) {
  let selectedTab = null;

  if (router && router["query"] && router.query[slug]) {
    selectedTab = router.query[slug];
  }

  if (selectedTab == null || !keys.includes(selectedTab)) {
    selectedTab = keys[0];
  }

  let selectedIndex = 0;
  try {
    selectedIndex = keys.indexOf(selectedTab);
  } catch {}

  return { selectedTab, selectedIndex };
}

export type TabListType = {
  /**
   * The query string key
   */
  slug: string;

  /**
   * Array of identifiers for each tab
   */
  keys: string[];

  /**
   * Array of labels for each tab
   */
  labels: string[];

  /**
   * Array of identifiers for each tab
   */
  panels: any[];

  /**
   * To pass to Next
   */
  asHref: string | any;

  /**
   * Is the tab on the side?
   */
  side?: boolean;

  /**
   * Is the tab on the side?
   */
  selectedIndex?: number;

  /**
   * Next Link class. For some reason this is required
   * for the bundled class to work.
   */
  Link?: any;
};

export const TabList: React.FC<TabListType> = ({
  // eslint-disable-next-line react/prop-types
  slug,
  // eslint-disable-next-line react/prop-types
  keys,
  // eslint-disable-next-line react/prop-types
  labels,
  // eslint-disable-next-line react/prop-types
  asHref,
  // eslint-disable-next-line react/prop-types
  selectedIndex,
  // eslint-disable-next-line react/prop-types
  side = false,
  // eslint-disable-next-line react/prop-types
  Link = null,
}) => {
  const router = useRouter();
  const tabs = [];
  let query = {};
  if (router && router.query) {
    query = router.query;
  }

  let asString = asHref;
  for (const key in query) {
    if (asString.indexOf(`[${key}]`) > -1) {
      asString = asString.replace(`[${key}]`, query[key]);
      delete query[key];
    }
  }

  // eslint-disable-next-line react/prop-types
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const label = labels[i];
    const isSelected = selectedIndex == i;

    tabs.push(
      <Tab
        key={`tab-${slug}-${key}`}
        isSelected={isSelected}
        href={{ query: { ...query, [slug]: key } }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        asLink={asString}
        label={label}
        side={side}
        icon={null}
        Link={Link}
      />,
    );
  }

  if (side === true) {
    return <React.Fragment>{tabs}</React.Fragment>;
  } else {
    return <nav className="flex border-b">{tabs}</nav>;
  }
};

// export const TabPanels: React.FC<TabsType> = ({
//   // eslint-disable-next-line react/prop-types
//   slug,
//   // eslint-disable-next-line react/prop-types
//   keys,
//   // eslint-disable-next-line react/prop-types
//   panels,
//   // eslint-disable-next-line react/prop-types
//   asHref,
//   // eslint-disable-next-line react/prop-types
//   side = false,
//   // eslint-disable-next-line react/prop-types
//   selectedIndex = 0,
// }) => {
//   const tabs = [];
//   // eslint-disable-next-line react/prop-types
//   for (let i = 0; i < keys.length; i++) {
//     const key = keys[i];
//     const panel = panels[i];
//     const isSelected = selectedIndex == i;
//     return panel
//     tabs.push(
//       <TabPanel isSelected={isSelected} key={`tabpanel-${slug}-${key}`}>{panel}</TabPanel>
//     )
//   }
//   return <React.Fragment>{tabs}</React.Fragment>;
// }

export const SideTabs: React.FC<TabsType> = ({
  // eslint-disable-next-line react/prop-types
  slug,
  // eslint-disable-next-line react/prop-types
  keys,
  // eslint-disable-next-line react/prop-types
  labels,
  // eslint-disable-next-line react/prop-types
  panels,
  // eslint-disable-next-line react/prop-types
  asHref,
  // eslint-disable-next-line react/prop-types
  side = true,
  // eslint-disable-next-line react/prop-types
  Link = null,
}) => {
  const router = useRouter();
  const { selectedTab, selectedIndex } = SelectedIndedAndLabel({
    slug,
    keys,
    router,
  });
  // onSelect={(firstTab, lastTab) => console.log(`${firstTab}, ${lastTab}`)}
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          <TabList
            {...{
              slug,
              keys,
              labels,
              panels,
              selectedTab,
              selectedIndex,
              asHref,
              side,
            }}
          />
        </nav>
      </aside>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        {panels[selectedIndex]}
      </div>
    </div>
  );
};

export const TopTabs: React.FC<TabsType> = ({
  // eslint-disable-next-line react/prop-types
  slug,
  // eslint-disable-next-line react/prop-types
  keys,
  // eslint-disable-next-line react/prop-types
  labels,
  // eslint-disable-next-line react/prop-types
  panels,
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  subtitle,
  // eslint-disable-next-line react/prop-types
  asHref,
  // eslint-disable-next-line react/prop-types
  side = false,
  // eslint-disable-next-line react/prop-types
  Link = null,
}) => {
  const router = useRouter();
  const { selectedTab, selectedIndex } = SelectedIndedAndLabel({
    slug,
    keys,
    router,
  });

  if (!title) {
    return (
      <React.Fragment>
        <TabList
          {...{
            slug,
            keys,
            labels,
            panels,
            selectedTab,
            selectedIndex,
            asHref,
            side,
          }}
        />
        {panels[selectedIndex]}
      </React.Fragment>
    );
  }

  return (
    <CardTitleFooter
      title={title}
      subtitle={subtitle}
      footer={null}
      tabs={
        <TabList
          {...{
            slug,
            keys,
            labels,
            panels,
            selectedTab,
            selectedIndex,
            asHref,
            side,
          }}
        />
      }
    >
      {panels[selectedIndex]}
    </CardTitleFooter>
  );
};

export type TabsType = {
  /**
   * Title of the tabs
   */
  title?: string;

  /**
   * Subtitle of the tabs
   */
  subtitle?: string;

  /**
   * The query string key
   */
  slug: string;

  /**
   * Array of identifiers for each tab
   */
  keys: string[];

  /**
   * Array of labels for each tab
   */
  labels: string[];

  /**
   * Array of identifiers for each tab
   */
  panels: any[];

  /**
   * To pass to Next
   */
  asHref: string | any;

  /**
   * Is the tab on the side?
   */
  side?: boolean;

  /**
   * Is the tab on the side?
   */
  selectedIndex?: number;

  /**
   * Is the tab on the side?
   */
  selected?: string;

  /**
   * Next Link class. For some reason this is required
   * for the bundled class to work.
   */
  Link?: any;
};

export const Tabs: React.FC<TabsType> = ({
  // eslint-disable-next-line react/prop-types
  slug,
  // eslint-disable-next-line react/prop-types
  keys,
  // eslint-disable-next-line react/prop-types
  labels,
  // eslint-disable-next-line react/prop-types
  panels,
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  subtitle,
  // eslint-disable-next-line react/prop-types
  asHref,
  // eslint-disable-next-line react/prop-types
  side = false,
  // eslint-disable-next-line react/prop-types
  Link = null,
}) => {
  if (side === true) {
    return (
      <SideTabs
        {...{ slug, keys, labels, panels, title, subtitle, asHref, side, Link }}
      />
    );
  } else {
    return (
      <TopTabs
        {...{ slug, keys, labels, panels, title, subtitle, asHref, side, Link }}
      />
    );
  }
};

export default Tabs;

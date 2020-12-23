import React from 'react';

import Page from '.';

export default {
  title: 'Components/Search',
  component: Page,
};

const Template = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  location: {
    search: '?query=michae'
  }
};
export const NoData = Template.bind({});
NoData.args = {
  location: {
    search: '?query=sfwarf'
  }
};

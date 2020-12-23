import React from 'react';

import Item from '.';

export default {
  title: 'Components/SearchItem',
  component: Item,
};

const Template = (args) => <Item {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 'https://www.mediawiki.org/wiki/Testing-access-wrapper',
  label: 'Test data for demo',
};

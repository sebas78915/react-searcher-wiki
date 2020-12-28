import React from 'react';
import moxios from 'moxios';

import Page from '.';

moxios.install();

moxios.stubRequest('https://www.mediawiki.org/w/api.php?origin=*&action=opensearch&search=michae&limit=50', {
  status: 200,
  response: ["michae",["Michael Jackson effect","ResourceLoader/Requirements/Michael Dale"],["",""],["https://www.mediawiki.org/wiki/Michael_Jackson_effect","https://www.mediawiki.org/wiki/ResourceLoader/Requirements/Michael_Dale"]]
})

moxios.stubRequest('https://www.mediawiki.org/w/api.php?origin=*&action=opensearch&search=edfwcevf&limit=50', {
  status: 200,
  response: ["edfwcevf",[],[],[]]
})

export default {
  title: 'Pages/Search',
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

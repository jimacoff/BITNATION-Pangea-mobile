import React from 'react';
import { shallow } from 'enzyme';

import NationsPanel from '../../../../UI/Dashboard/NationsPanel';

test('NationsPanel renders correctly', () => {
  const wrapper = shallow((
    <NationsPanel
      nations={[]}
      onSelectNation={jest.fn()}
      loadingInProgress={false}
    />
  ));
  expect(wrapper).toMatchSnapshot();
});

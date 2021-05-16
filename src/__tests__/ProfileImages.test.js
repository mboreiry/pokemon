import { mount } from 'enzyme';
import ProfileImages from '../components/ProfileImages';
import { act } from 'react-dom/test-utils';
import * as service from '../services/PokeService';

test('show skeleton while loading Image', async () => {
    service.getPokeImage = async () => { return null };
    const wrapper = mount(<ProfileImages url="" />);
    await act(async () => {
        await Promise.resolve(wrapper);
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
    });
    const component = wrapper.find('[data-test="skeleton"]');
    expect(component.length).toBe(1);
});


import { shallow } from 'enzyme';
import Profile from '../components/Profile';

test('make a link on profile when hastLink: true', async () => {
    const wrapper = shallow(<Profile hasLink={true} pokeUrl={{ name: '', url: '' }} />);
    const component = wrapper.find('[data-test="profileLink"]');
    expect(component.length).toBe(1);
});

test('make a simple profile without link when hastLink: false', async () => {
    const wrapper = shallow(<Profile hasLink={false} pokeUrl={{ name: '', url: '' }} />);
    const component = wrapper.find('[data-test="profileLink"]');
    expect(component.length).toBe(0);
});

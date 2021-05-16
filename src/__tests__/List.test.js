import { mount } from 'enzyme';
import List from '../components/List';
import { MemoryRouter } from 'react-router';
import { act } from 'react-dom/test-utils';
import * as service from '../services/PokeService';


test('show pokelist after loading page', async () => {
    let wrapper;
    service.fetchUrl = async () => { return { results: [{ name: 'test', url: '' }] } };
    await act(async () => {
        wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <List />
            </MemoryRouter>
        );
    });
    wrapper.update();
    const component = wrapper.find('[data-test="pokemons"]');
    expect(component.length).toBe(1);
});

test('show pokelist after loading specific page', async () => {
    let wrapper;
    service.fetchUrl = async () => { return { results: [{ name: 'test', url: '' }] } };
    await act(async () => {
        wrapper = mount(
            <MemoryRouter initialEntries={['/page/5']}>
                <List />
            </MemoryRouter>
        );
    });
    wrapper.update();
    const component = wrapper.find('[data-test="pokemons"]');
    expect(component.length).toBe(1);
});

test('show error box when pokeList has no item', async () => {
    let wrapper;
    service.fetchUrl = async () => { return [] };
    await act(async () => {
        wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <List />
            </MemoryRouter>
        );
    });
    const component = wrapper.find('[data-test="error"]');
    expect(component.length).toBe(1);
});
import Animation from '@/src/components/Animation';
import { render } from '@testing-library/react-native';

describe('<Animation />', () => {
  it('displays measurement result correctly', () => {
    const { getByTestId } = render(<Animation animation="fake-animation" />);

    expect(getByTestId('Animation')).toBeTruthy();
  });
});

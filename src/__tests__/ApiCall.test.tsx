import { render, screen, waitFor } from '@testing-library/react';
import ApiCall from '../ApiCall';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiCall Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders post titles from successful API response', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { userId: 1, id: 1, title: 'Test Title 1', body: 'Body 1' },
        { userId: 2, id: 2, title: 'Test Title 2', body: 'Body 2' },
      ],
    });

    render(<ApiCall />);

    await waitFor(() => {
      expect(screen.getByText('Test Title 1')).toBeInTheDocument();
      expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    });
  });

  it('renders fallback text if API returns empty array', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<ApiCall />);

    await waitFor(() => {
      expect(screen.getByText('No posts found')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully (does not crash)', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {}); // suppress error

    render(<ApiCall />);

    await waitFor(() => {
      expect(screen.getByText('No posts found')).toBeInTheDocument();
    });

    consoleErrorMock.mockRestore(); // restore original
  });
});

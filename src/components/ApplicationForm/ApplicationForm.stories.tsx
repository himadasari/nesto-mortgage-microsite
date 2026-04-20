import type { Meta, StoryObj } from '@storybook/react';
import ApplicationForm from './ApplicationForm';

const meta = {
  title: 'Components/ApplicationForm',
  component: ApplicationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ApplicationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    isLoading: false,
    onSubmit: () => {},
  },
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      firstName: 'Hima',
      lastName: 'Dasari',
      email: 'hima@client.ca',
      phone: '1234567890',
    },
    isLoading: false,
    onSubmit: () => {},
  },
};

export const Loading: Story = {
  args: {
    initialData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    isLoading: true,
    onSubmit: () => {},
  },
};

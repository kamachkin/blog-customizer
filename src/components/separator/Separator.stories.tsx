import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

// Meta для компонента Separator
// Это мета-данные для Storybook, указывающие компонент и его настройки
const meta: Meta<typeof Separator> = {
	component: Separator, // Указываем сам компонент для Storybook
};

export default meta;

type Story = StoryObj<typeof Separator>;

// Пример истории для компонента Separator
// Здесь описан один из вариантов использования компонента
// В этом случае мы просто рендерим Separator без дополнительных пропсов или кастомизаций
export const SelectStory: Story = {
	render: () => {
		return <Separator />; // Отображаем компонент Separator
	},
};

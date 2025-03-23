import { Text } from 'components/text';
import styles from './Button.module.scss';
import { FC, useCallback } from 'react';

interface ButtonProps {
	title: string; // Текст кнопки
	onClick?: () => void; // Опциональный обработчик клика
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']; // Тип кнопки (submit, button, reset)
}

export const Button: FC<ButtonProps> = ({
	title,
	onClick,
	type = 'button',
}) => {
	// Оптимизированный обработчик клика, предотвращает лишние ререндеры
	const handleClick = useCallback(() => {
		if (onClick) onClick();
	}, [onClick]);

	return (
		<button
			className={styles.button}
			type={type}
			onClick={handleClick}
			aria-label={title} // Улучшает доступность для screen reader'ов
		>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};

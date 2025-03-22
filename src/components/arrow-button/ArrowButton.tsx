import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { useCallback } from 'react';

/** Тип функции-обработчика клика */
export type OnClick = () => void;

interface Props {
	toggleOpenFn: OnClick; // Функция для смены состояния
	openState: boolean; // Текущее состояние кнопки (открыто/закрыто)
}

export const ArrowButton = ({ toggleOpenFn, openState }: Props) => {
	// Обработчик нажатия клавиш (чтобы можно было управлять кнопкой с клавиатуры)
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				toggleOpenFn();
			}
		},
		[toggleOpenFn]
	);

	return (
		<div
			role='button'
			aria-label={openState ? 'Закрыть параметры' : 'Открыть параметры'}
			tabIndex={0}
			onClick={toggleOpenFn}
			onKeyDown={handleKeyDown}
			className={clsx(styles.container, {
				[styles.container_open]: openState,
			})}>
			<img
				src={arrow}
				alt='Стрелка'
				className={clsx(styles.arrow, { [styles.arrow_open]: openState })}
			/>
		</div>
	);
};

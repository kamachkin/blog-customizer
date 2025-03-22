import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

type SelectProps = {
	/** Выбранный элемент */
	selected: OptionType | null;
	/** Список возможных вариантов */
	options: OptionType[];
	/** Текст-плейсхолдер для отображения, если ничего не выбрано */
	placeholder?: string;
	/** Функция-обработчик выбора нового значения */
	onChange?: (selected: OptionType) => void;
	/** Функция-обработчик закрытия */
	onClose?: () => void;
	/** Заголовок выпадающего списка */
	title?: string;
};

export const Select = ({
	options,
	placeholder,
	selected,
	onChange,
	onClose,
	title,
}: SelectProps) => {
	/** Состояние открытости селекта */
	const [isOpen, setIsOpen] = useState<boolean>(false);

	/** Ref для всего компонента, используется в хуке закрытия при клике снаружи */
	const rootRef = useRef<HTMLDivElement>(null);
	/** Ref для плейсхолдера, используется в обработке нажатия Enter */
	const placeholderRef = useRef<HTMLDivElement>(null);

	/** Закрывает селект при клике за его пределами */
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	/** Обрабатывает нажатие Enter для открытия/закрытия селекта */
	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	/** Обработчик клика по опции */
	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false);
		onChange?.(option);
	};

	/** Обработчик клика по плейсхолдеру (открывает/закрывает список) */
	const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			{/* Заголовок селекта, если передан */}
			{title && (
				<Text size={12} weight={800} uppercase>
					{title}
				</Text>
			)}

			{/* Обертка селекта */}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}
				data-testid='selectWrapper'>
				{/* Иконка стрелки, меняет направление при открытии */}
				<img
					src={arrowDown}
					alt='Иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				/>

				{/* Плейсхолдер / заголовок селекта */}
				<div
					className={clsx(
						styles.placeholder,
						selected?.optionClassName && styles[selected.optionClassName]
					)}
					data-selected={!!selected?.value}
					onClick={handlePlaceholderClick}
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected.className
								: undefined
						}>
						{selected?.title || placeholder}
					</Text>
				</div>

				{/* Выпадающий список, если селект открыт */}
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(option)}
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};

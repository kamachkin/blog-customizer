import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useEffect, useCallback } from 'react';

import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { IAllOptions } from 'src/index';

export type ChangeSelectFn = (selection: OptionType) => void;

interface PropsArticleParamsForm {
	/** Функция для изменения состояния страницы */
	setPageState: React.Dispatch<React.SetStateAction<IAllOptions>>;
	/** Начальное состояние открытия (по умолчанию закрыто) */
	toggleOpenFn: () => void;
	/** Новый проп для управления состоянием открытия */
	isOpen: boolean;
}

export const ArticleParamsForm = ({
	setPageState,
	toggleOpenFn,
	isOpen,
}: PropsArticleParamsForm) => {
	// Состояние для хранения текущих значений формы
	const [formState, setFormState] = useState<IAllOptions>(defaultArticleState);

	// Функция для сброса формы на значения по умолчанию
	function setDefaultOptions() {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	}

	// Обработка отправки формы, обновление состояния страницы
	function submitForm(evt: React.SyntheticEvent) {
		evt.preventDefault();
		setPageState(formState);
	}

	// Обработчик клика вне компонента
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const asideElement = document.querySelector(`.${styles.container}`);
			const arrowButton = document.querySelector(
				'button[aria-label="Toggle settings panel"]'
			); // Предполагаемый селектор кнопки

			// Проверяем, что клик не был по сайдбару или по кнопке открытия
			if (
				asideElement &&
				!asideElement.contains(event.target as Node) &&
				arrowButton &&
				!arrowButton.contains(event.target as Node)
			) {
				toggleOpenFn(); // Закрываем сайдбар
			}
		},
		[toggleOpenFn]
	);

	// Обработчик нажатия клавиши ESC
	const handleEscPress = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleOpenFn();
			}
		},
		[toggleOpenFn]
	);

	// Эффект для добавления/удаления обработчиков событий
	useEffect(() => {
		// Добавляем обработчики только если форма открыта
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscPress);
		}

		// Очистка обработчиков при размонтировании или закрытии формы
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscPress);
		};
	}, [isOpen, handleClickOutside, handleEscPress]);

	return (
		<>
			{/* Кнопка для открытия/закрытия формы */}
			<ArrowButton toggleOpenFn={toggleOpenFn} openState={isOpen} />

			{/* Основной контейнер формы с динамическим классом в зависимости от состояния открытия */}
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen, // Применяется если форма открыта
				})}>
				{/* Форма с параметрами статьи */}
				<form className={styles.form} onSubmit={submitForm}>
					{/* Заголовок формы */}
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					{/* Выбор шрифта */}
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) =>
							setFormState((oldState: IAllOptions) => ({
								...oldState,
								fontFamilyOption: selected,
							}))
						}
					/>

					{/* Выбор размера шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected: OptionType) =>
							setFormState((oldState: IAllOptions) => ({
								...oldState,
								fontSizeOption: selected,
							}))
						}
					/>

					{/* Выбор цвета шрифта */}
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							setFormState((oldState: IAllOptions) => ({
								...oldState,
								fontColor: selected,
							}))
						}
					/>

					{/* Разделитель */}
					<Separator />

					{/* Выбор цвета фона */}
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							setFormState((oldState: IAllOptions) => ({
								...oldState,
								backgroundColor: selected,
							}))
						}
					/>

					{/* Выбор ширины контента */}
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							setFormState((oldState: IAllOptions) => ({
								...oldState,
								contentWidth: selected,
							}))
						}
					/>

					{/* Нижняя панель с кнопками */}
					<div className={styles.bottomContainer}>
						{/* Кнопка для сброса параметров */}
						<Button title='Сбросить' type='reset' onClick={setDefaultOptions} />
						{/* Кнопка для применения параметров */}
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

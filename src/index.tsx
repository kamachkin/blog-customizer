import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

// Определение интерфейса IAllOptions
export interface IAllOptions {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
}

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние для хранения настроек статьи
	const [pageState, setPageState] = useState<IAllOptions>(defaultArticleState);
	// Состояние открытия/закрытия формы
	const [isFormOpen, setIsFormOpen] = useState(false);

	// Функция для переключения состояния открытия формы
	const toggleOpenForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	// Функция для закрытия формы (используется при клике на статью)
	const closeForm = () => {
		setIsFormOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				toggleOpenFn={toggleOpenForm}
				openState={isFormOpen}
				setPageState={setPageState}
			/>
			<Article closeFn={closeForm} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

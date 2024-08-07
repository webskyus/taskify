const placeholder =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAACy0lEQVR4nO3Z2XbjIBAE0Bp9OZ8+Dz2e40QCNdAb0PWSE8sWXTexreVPAVAKMoxcKCWxWCnloh/p9ZJSPlhIr2Y+ONf9ocyPfLFctQ0Z4DfI1d58dG4UN6ynJ52YJ4QnrMpTD0qlfgWr/oL9Uy9ex2q+bNs0Kzex3l68W97KvmExdrFJGDUZWLwdrR1eQR4We3dLhl2NjdWz05XSU6oHq3PXC6SzTidW/wJx01+kH2tomXAZqjCENbpYlIwOP4o1saRzJsaewJpb2CdzA89hTS9vmulRp7EkhrCIxJASWAjvJTSeEBYCe8kNJoeFkF6iI4liIZiX9DDSWAjjpTCGAhYCeOkMoIMFVy+1pdWw4OSluagmFsy9lJdTxoKhl/5C+lgw8TL5k5hgQbmM1T+vFRbUKhl+LBpiQaGY7ReILRZE65kfmphjQaikx0GcBxamqzqdHjhhYaKw34mUHxaGarueortiobO898UMbyywCbylEAILDIgAUoiChSZHDCkEwkIFJYwUYmHhRhNJCuGw8AUUTAoRsfBhCiaFxOpKPKx8G3KTH/Dc5KEDN3lQyk2e7nCTJ9Lc5CUabvLiHzd5WZmbvGHBTd4K4yZvsnIjXs/WyxBLqZihlxWWaiUrLxMsgzImXvpYZm8T/YWUsYy/sJSX08RyOXTUXFQNy/EkTm1pHSzvywNKAyhguUtRFMaQxgoiRZEeRhQrlBRFdCQ5rIBSFLnBhLDCSlGExpPACi5FkRhyGmsJKcr0qHNYC0lR5gaewFpOijIx9ijWolKU0eGHsJaWogxV6MfaQIrSX6QTaxspSmedHqzNpCg9pdhYW0pR2NV4WBtLUXgFGVjbS1EYNd+wDpGivJVtYh0lRWlWrmMdKEWpF69gHStFqdR/wjpcivKEcMNKqf+5UVztzafnJ8hV25D5ly+W6/5Q5nc+ONf3L5lqSkEpfwElAotXgK0AkQAAAABJRU5ErkJggg==';

const gradientColors = [
	'bg-gradient-to-r from-cyan-500 to-blue-500',
	'bg-gradient-to-r from-sky-500 to-indigo-500',
	'bg-gradient-to-r from-violet-500 to-fuchsia-500',
	'bg-gradient-to-r from-purple-500 to-pink-500',
	'bg-gradient-to-r from-red-500 to-yellow-500',
	'bg-gradient-to-r from-green-500 to-blue-500',
	'bg-gradient-to-r from-yellow-500 to-orange-500',
	'bg-gradient-to-r from-pink-500 to-purple-500',
	'bg-gradient-to-r from-blue-500 to-indigo-500',
	'bg-gradient-to-r from-red-500 to-pink-500',
	'bg-gradient-to-r from-indigo-500 to-purple-500',
];

enum FORM_IDS {
	CREATE_COLUMN_DIALOG_FORM = 'create-column-dialog-form',
	CREATE_TASK_DIALOG_FORM = 'create-task-dialog-form',
}

export { placeholder, gradientColors, FORM_IDS };

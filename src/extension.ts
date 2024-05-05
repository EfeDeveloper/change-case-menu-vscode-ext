import * as vscode from 'vscode';
import * as lodash from 'lodash';

type CaseType = 'camelCase' | 'snakeCase' | 'Constant case' | 'kebabCase' | 'trainCase';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.changeCase.camelCase', () => {
      changeCase('camelCase');
    }),
    vscode.commands.registerCommand('extension.changeCase.snakeCase', () => {
      changeCase('snakeCase');
    }),
    vscode.commands.registerCommand('extension.changeCase.upperSnakeCase', () => {
      changeCase('Constant case');
    }),
    vscode.commands.registerCommand('extension.changeCase.kebabCase', () => {
      changeCase('kebabCase');
    }),
    vscode.commands.registerCommand('extension.changeCase.trainCase', () => {
      changeCase('trainCase');
    })
  );
}

async function changeCase(caseType: CaseType) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  let convertedText: string;

  switch (caseType) {
    case 'camelCase':
      convertedText = lodash.camelCase(text);
      break;
    case 'snakeCase':
      convertedText = lodash.snakeCase(text);
      break;
    case 'Constant case':
      convertedText = lodash.upperCase(text).replace(/\s/g, '_');
      break;
    case 'kebabCase':
      convertedText = lodash.kebabCase(text);
      break;
    case 'trainCase':
      convertedText = lodash.startCase(lodash.camelCase(text)).replace(/\s/g, '-');
      break;
    default:
      convertedText = text;
      break;
  }

  await editor.edit((editBuilder) => {
    editBuilder.replace(selection, convertedText);
  });
}

export function deactivate() {}

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as CryptoJS from 'crypto-js';

export function activate(context: vscode.ExtensionContext) {

	let onlyHash = vscode.commands.registerCommand('file-hash.get-file-hash', (resource: vscode.Uri) => {
		console.log(resource.path);

		vscode.workspace.openTextDocument(resource).then((document) => {
			let text = document.getText();
			let hash = CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
			vscode.env.clipboard.writeText(hash);
			vscode.window.showInformationMessage('Hash copied to clipboard!');
		  });
	});

	context.subscriptions.push(onlyHash);

	let hashAndTrim = vscode.commands.registerCommand('file-hash.trim-and-get-file-hash', (resource: vscode.Uri) => {
		console.log(resource.path);

		vscode.workspace.openTextDocument(resource).then((document) => {
			let text = document.getText();
			text = text.replace(/^\t+/gm, " ");
			text = text.replace(/(\r\n|\n|\r)/gm, "");
			fs.writeFileSync(resource.fsPath, text, 'utf8');
			let hash = CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
			vscode.env.clipboard.writeText(hash);
			vscode.window.showInformationMessage('Hash copied to clipboard!');
		  });
	});

	context.subscriptions.push(hashAndTrim);
}

// This method is called when your extension is deactivated
export function deactivate() {}

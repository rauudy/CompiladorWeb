// symbolTableEndpoint.ts
import { Request, Response } from 'express';
import Context from '../Context/Context.js';

const generateSymbolTableHTML = (symbolTable: any[]) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tabla de Símbolos</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                text-align: center;
                margin-bottom: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                background-color: white;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }
            th {
                background-color: #4CAF50;
                color: white;
            }
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            tr:hover {
                background-color: #f5f5f5;
            }
            .description {
                color: #666;
                margin-bottom: 20px;
                text-align: center;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Tabla de Símbolos</h1>
            <p class="description">
                Este reporte muestra la tabla de símbolos después de la ejecución.
                Muestra las variables y arreglos declarados, así como su tipo,
                valor y toda la información relevante.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Tipo</th>
                        <th>Entorno</th>
                        <th>Valor</th>
                        <th>Línea</th>
                        <th>Columna</th>
                    </tr>
                </thead>
                <tbody>
                    ${symbolTable.map((symbol, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${symbol.id}</td>
                            <td>${symbol.varType}</td>
                            <td>${symbol.dataType}</td>
                            <td>${symbol.environment}</td>
                            <td>${Array.isArray(symbol.value) ? 
                                `[${symbol.value.join(', ')}]` : 
                                String(symbol.value)}</td>
                            <td>${symbol.line}</td>
                            <td>${symbol.column}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </body>
    </html>
  `;
};

const symbolTableEndpoint = (req: Request, res: Response) => {
  try {
    const symbolTable = req.app.locals.symbolTable || [];
    const html = generateSymbolTableHTML(symbolTable);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).send('Error al generar la tabla de símbolos');
  }
};

export default symbolTableEndpoint;
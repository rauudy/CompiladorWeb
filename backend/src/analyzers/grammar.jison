%{
  import LexicalError from '../Exceptions/Lexical.js';
%}

%lex
%options case_insensitive

%%

\s+               /* skip whitespace */
"//".*										              // comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas
[0-9]+(\.[0-9]+)?                return 'DOUBLE_LITERAL'
[0-9]+                           return 'INT_LITERAL'
(\"[^"]*\")                      return 'STRING_LITERAL'
[tT][rR][uU][eE]                 return 'TRUE_LITERAL'
[fF][aA][lL][sS][eE]             return 'FALSE_LITERAL'

"++"                             return '++'
"--"                             return '--'

";"                              return ';'
":"                              return ':'
"-"                              return '-'
"+"                              return '+'

"*"                              return '*'
"/"                              return '/'
"^"                              return '^'
"$"                              return '$'
"%"                              return '%'

"=="                             return '=='
"!="                             return '!='
"<="                             return '<='
">="                             return '>='
"<"                              return '<'
">"                              return '>'

"="                              return '='
"("                              return '('
")"                              return ')'
"{"                              return '{'
"}"                              return '}'

"["                              return '['
"]"                              return ']'
[nN][eE][wW]                     return 'NEW'
[vV][eE][cC][tT][oO][rR]         return 'VECTOR'

[eE][cC][hH][oO]                 return 'ECHO'
// "let"                         return 'LET'
[lL][eE][tT]                     return 'LET'
[iI][nN][tT]                     return 'INT'
[dD][oO][uU][bB][lL][eE]         return 'DOUBLE'
[bB][oO][oO][lL]                 return 'BOOL'
[cC][hH][aA][rR]                 return 'CHAR'
[sS][tT][rR][iI][nN][gG]         return 'STRING'
[nN][uU][lL][lL]                 return 'NULL'

[iI][fF]                         return 'IF'
[eE][lL][sS][eE]                 return 'ELSE'
[cC][aA][sS][tT]                 return 'CAST'  
[aA][sS]                         return 'AS'

[sS][wW][iI][tT][cC][hH]         return 'SWITCH'
[cC][aA][sS][eE]                 return 'CASE'
[dD][eE][fF][aA][uU][lL][tT]     return 'DEFAULT'
[bB][rR][eE][aA][kK]             return 'BREAK'
[fF][oO][rR]                     return 'FOR'
[wW][hH][iI][lL][eE]             return 'WHILE'
[dD][oO]                         return 'DO'
[uU][nN][tT][iI][lL]             return 'UNTIL'
[lL][oO][oO][pP]                 return 'LOOP'

[lL][oO][wW][eE][rR]             return 'LOWER'
[uU][pP][pP][eE][rR]             return 'UPPER'
[rR][oO][uU][nN][dD]             return 'ROUND'
[lL][eE][nN]                     return 'LEN'
[tT][rR][uU][nN][cC][aA][tT][eE] return 'TRUNCATE'
[iI][sS]                         return 'IS'
[tT][oO][sS][tT][rR][iI][nN][gG] return 'TO_STRING'
[tT][oO][cC][hH][aA][rR][aA][rR][rR][aA][yY]  return 'TO_CHAR_ARRAY'
[rR][eE][vV][eE][rR][sS][eE]     return 'REVERSE'
[mM][iI][nN]                     return 'MIN'
[mM][aA][xX]                     return 'MAX'
[aA][vV][eE][rR][aA][gG][eE]     return 'AVERAGE'
[sS][uU][mM]                     return 'SUM'

[rR][eE][tT][uU][rR][nN]         return 'RETURN'
[cC][oO][nN][tT][iI][nN][uU][eE] return 'CONTINUE'

[fF][uU][nN][cC][tT][iI][oO][nN] return 'FUNCTION'
[vV][oO][iI][dD]                 return 'VOID'
","                              return ','

"||"                             return '||'
"&&"                             return '&&'
"!""                             return '!'

[cC][oO][nN][sS][tT]             return 'CONST'

[eE][jJ][eE][cC][uU][tT][aA][rR] return 'EJECUTAR'

[a-zA-Z][a-zA-Z0-9_]*             return 'IDENTIFIER'
<<EOF>>                          return 'EOF'
. {
  throw new LexicalError(yytext, yylineno + 1, yylloc.first_column + 1);
}

/lex

/* operator associations and precedence */
%{
  import SyntaxError from '../Exceptions/Syntax.js'
  import BinaryExpr from '../Expressions/Binary.js'
  import LiteralExpr from '../Expressions/Literal.js'
  import UnaryExpr from '../Expressions/Unary.js'
  import EchoStmt from '../Statements/Echo.js'
  import VarDeclarationStmt from '../Statements/VarDeclaration.js'
  import VarAssignmentStmt from '../Statements/VarAssignment.js'
  import VarLookUpExpr from '../Expressions/VarLookUp.js'
  import BlockStmt from '../Statements/Block.js'
  import LowerExpr from '../Expressions/nativas/lower.js'
  import UpperExpr from '../Expressions/nativas/upper.js'
  import RoundExpr from '../Expressions/nativas/round.js'
  import LengthExpr from '../Expressions/nativas/length.js'
  import TruncateExpr from '../Expressions/nativas/truncate.js'
  import IsExpr from '../Expressions/nativas/is.js'
  import ToStringExpr from '../Expressions/nativas/tostring.js'
  import TernaryExpr from '../Expressions/Ternary.js'
  import CastExpr from '../Expressions/Casteo.js'
  import IncrementExpr from '../Expressions/Increment.js'
  import DecrementExpr from '../Expressions/Decrement.js'
  import IfStmt from '../Statements/If.js'
  import { SwitchStmt, CaseStmt, DefaultStmt, BreakStmt } from '../Statements/Switch.js';
  import ForStmt from '../Statements/For.js'
  import WhileStmt from '../Statements/While.js'
  import DoUntilStmt from '../Statements/DoUntil.js'
  import FunctionDeclarationStmt from '../Statements/FunctionDeclaration.js'
  import FunctionCallExpr from '../Expressions/FunctionCall.js'
  import { ContinueStmt } from '../Statements/Continue.js'
  import ReturnStmt from '../Statements/Return.js'
  import getLogicalOr from '../Expressions/operations/LogicalOr.js'
  import getLogicalAnd from '../Expressions/operations/LogicalAnd.js'
  import getLogicalNot from '../Expressions/operations/LogicalNot.js'
  import { VectorDeclarationStmt } from '../Statements/VectorDeclaration.js'
  import { VectorInitExpr } from '../Statements/VectorInit.js'
  import { VectorLiteralExpr } from '../Statements/VectorLiteral.js'
  import { VectorAssignmentStmt } from '../Statements/VectorAssignment.js'
  import { VectorAccessExpr } from '../Statements/VectorAccess.js'
  import ReverseExpr from '../Expressions/nativas/reverse.js'
  import MaxExpr from '../Expressions/nativas/max.js'
  import MinExpr from '../Expressions/nativas/min.js'
  import SumExpr from '../Expressions/nativas/sum.js'
  import AverageExpr from '../Expressions/nativas/average.js'
  import EjecutarStmt from '../Statements/Ejecutar.js'
  import { LoopContinue, LoopBreak } from '../Statements/LoopControlStatements.js'; 
  import LoopStmt from '../Statements/Loop.js';
  import ToCharArrayExpr from '../Expressions/nativas/tochararray.js' 
  const errors: any[] = []
%}

%left '++' '--'
%left '==' '!=' '<=' '>=' '<' '>'
%left '+' '-'
%left '*' '/' '%'
%right '^'
%left '$'
%right UMINUS
%right 'IS''IF'
%left '||'
%left '&&'
%right '!'

%start start

%% /* language grammar */

start
  : statements EOF
  { return {errors: errors, ast: $1} }
;

statements
  : statements statement ';'
  {
    $1.push($2)
    $$ = $1
  }
  | statement ';'
  { $$ = [$1] }
  | error ';'
  {
    errors.push(new SyntaxError($1, @1))
    $$ = []
  }
  | statements BREAK ';'
  { $1.push(new BreakStmt(@2)); $$ = $1; }
  | BREAK ';'
  { $$ = [new LoopBreak(@1)]; }
  | CONTINUE ';'
  { $$ = [new LoopContinue(@1)];}
  | statements CONTINUE ';'
  { $$ = [new LoopContinue(@2)]; $$ = $1; }
;

statement
  : ECHO expression 
  { $$ = new EchoStmt($2, @1) }
  | ejecutar_statement 
  | var_declaration 
  | const_declaration 
  | var_assignment
  | block
  | increment_decrement
  | if_statement
  | switch_statement
  | for_statement
  | while_statement
  | do_until_statement
  | loop_statement
  | function_declaration 
  | method_declaration
  | function_call
  | RETURN expression
    { $$ = new ReturnStmt($2, @1); }
  | RETURN
    { $$ = new ReturnStmt(null, @1); }
  | REVERSE '(' IDENTIFIER ')'
  { $$ = new ReverseExpr($3, @1) }
  | MAX '(' IDENTIFIER ')' { $$ = new MaxExpr($3, @1); }
  | MIN '(' IDENTIFIER ')' { $$ = new MinExpr($3, @1); }
  | SUM '(' IDENTIFIER ')' { $$ = new SumExpr($3, @1); }
  | AVERAGE '(' IDENTIFIER ')' { $$ = new AverageExpr($3, @1); }
;

ejecutar_statement
: EJECUTAR IDENTIFIER '(' ')'
    { $$ = new EjecutarStmt($2, [], @1); }
  | EJECUTAR IDENTIFIER '(' ejecutar_params ')'
    { $$ = new EjecutarStmt($2, $4, @1); }
;

ejecutar_params
: ejecutar_param
    { $$ = [$1]; }
  | ejecutar_params ',' ejecutar_param
    { $1.push($3); $$ = $1; }
;

ejecutar_param
: expression
    { $$ = $1; }
;

function_declaration
  : FUNCTION type IDENTIFIER '(' parameters ')' block
    { $$ = new FunctionDeclarationStmt($2, $3, $5, $7, @1); }
;

method_declaration
  : FUNCTION VOID IDENTIFIER '(' parameters ')' block
    { $$ = new FunctionDeclarationStmt('void', $3, $5, $7, @1); }
;

parameters
  : parameter_list
  | /* empty */
    { $$ = []; }
;

parameter_list
  : parameter_list ',' parameter
    { $1.push($3); $$ = $1; }
  | parameter
    { $$ = [$1]; }
;

parameter
  : IDENTIFIER ':' type
    { $$ = { name: $1, type: $3 }; }
  | IDENTIFIER ':' type '=' expression
    { $$ = { name: $1, type: $3, defaultValue: $5 }; }
;

block
  : '{' statements '}'
  { $$ = new BlockStmt($2, @1)}
;

if_statement
  : IF '(' expression ')' block
  { $$ = new IfStmt($3, $5, null, @1) }
  | IF '(' expression ')' block ELSE block
  { $$ = new IfStmt($3, $5, $7, @1) }
  | IF '(' expression ')' block ELSE if_statement
  { $$ = new IfStmt($3, $5, $7, @1) }
;

switch_statement
  : SWITCH '(' expression ')' '{' case_list '}'
  { $$ = new SwitchStmt($3, $6, null, @1) }
  | SWITCH '(' expression ')' '{' case_list default_case '}'
  { $$ = new SwitchStmt($3, $6, $7, @1) }
;

case_list
  : case_list case
  { $1.push($2); $$ = $1; }
  | case
  { $$ = [$1]; }
;

case
  : CASE expression ':' statements
  { $$ = new CaseStmt($2, $4, @1) }
;

default_case
  : DEFAULT ':' statements
  { $$ = new DefaultStmt($3, @1) }
;

for_statement
  : FOR '(' for_init ';' expression ';' for_update ')' block
  { $$ = new ForStmt($3, $5, $7, $9, @1) }
;

for_init
  : var_declaration
  | var_assignment
  | /* empty */
  { $$ = null }
;

for_update
  : var_assignment
  | increment_decrement
  | /* empty */
  { $$ = null }
;

while_statement
  : WHILE '(' expression ')' block
  { $$ = new WhileStmt($3, $5, @1) }
;

do_until_statement
  : DO block UNTIL '(' expression ')'
  { $$ = new DoUntilStmt($2, $5, @1) }
;

loop_statement
  : LOOP '{' statements '}'
  { $$ = new LoopStmt(new BlockStmt($3, @3), @1) }
;

var_declaration
  : LET IDENTIFIER ':' type '=' expression
  { $$ = new VarDeclarationStmt($2, $4, $6, @2, false) }
  | LET IDENTIFIER ':' type
  { $$ = new VarDeclarationStmt($2, $4, null, @2, false) }
  | LET IDENTIFIER ':' vector_type '=' vector_expression
  { $$ = new VectorDeclarationStmt($2, $4, $6, @2) }
;

vector_type
  : type '[' ']'
  { $$ = { baseType: $1, dimensions: 1 } }
  | type '[' ']' '[' ']'
  { $$ = { baseType: $1, dimensions: 2 } }
;

vector_expression
  : NEW VECTOR type '[' expression ']'
  { $$ = new VectorInitExpr($3, [$5], @1) }
  | NEW VECTOR type '[' expression ']' '[' expression ']'
  { $$ = new VectorInitExpr($3, [$5, $8], @1) }
  | '[' vector_values ']'
  { $$ = new VectorLiteralExpr($2, @1) }
;

vector_values
  : vector_values ',' vector_item
  { $1.push($3); $$ = $1; }
  | vector_item
  { $$ = [$1]; }
;

vector_item
  : expression
  { $$ = $1; }
  | '[' vector_values ']'
  { $$ = new VectorLiteralExpr($2, @1); }
;

const_declaration
  : CONST IDENTIFIER ':' type '=' expression
  { $$ = new VarDeclarationStmt($2, $4, $6, @2, true) }
  | CONST IDENTIFIER ':' type
  { $$ = new VarDeclarationStmt($2, $4, null, @2, true) }
;

var_assignment
  : IDENTIFIER '=' expression
  { $$ = new VarAssignmentStmt($1, $3, @1) }
  | IDENTIFIER '[' expression ']' '=' expression
  { $$ = new VectorAssignmentStmt($1, [$3], $6, @1) }
  | IDENTIFIER '[' expression ']' '[' expression ']' '=' expression
  { $$ = new VectorAssignmentStmt($1, [$3, $6], $9, @1) }
;

expressions
  : expressions expression
  {
    $1.push($2)
    $$ = $1
  }
  | expression
  {$$ = [$1]}
;

expression
  : arithmetic
  | '(' expression ')'
  { $$ = $2 }
  | relational
  | ternary
  | casteo
  | logical
  | '(' error ')'
  {
    errors.push(new SyntaxError(@2, @2))
  }
  | '-' expression %prec UMINUS
  { $$ = new UnaryExpr($1, $2, @1) }
  | literal
  | IDENTIFIER
  { $$ = new VarLookUpExpr($1, @1) }
  | LOWER '(' expression ')'
  { $$ = new LowerExpr($3, @1) }
  | UPPER '(' expression ')'
  { $$ = new UpperExpr($3, @1) }
  | ROUND '(' expression ')'
  { $$ = new RoundExpr($3, @1) }
  | LEN '(' expression ')'
  { $$ = new LengthExpr($3, @1) }
  | TRUNCATE '(' expression ')'
  { $$ = new TruncateExpr($3, @1) }
  | TO_STRING '(' expression ')'
  { $$ = new ToStringExpr($3, @1) }
  | TO_CHAR_ARRAY '(' expression ')'
  { $$ = new ToCharArrayExpr($3, @1) }
  | expression 'IS' type
  { $$ = new IsExpr($1, $3, @1) }
  | increment_decrement
  | function_call
  | RETURN 
  { $$ = new ReturnStmt(null, @1); }
  | CONTINUE 
  { $$ = new ContinueStmt(@1); }
  | IDENTIFIER '[' expression ']'
  { $$ = new VectorAccessExpr($1, [$3], @1) }
  | IDENTIFIER '[' expression ']' '[' expression ']'
  { $$ = new VectorAccessExpr($1, [$3, $6], @1) }
  | REVERSE '(' IDENTIFIER ')'
  { $$ = new ReverseExpr($3, @1) }
  | MAX '(' IDENTIFIER ')' 
  { $$ = new MaxExpr($3, @1); }
  | MIN '(' IDENTIFIER ')' 
  { $$ = new MinExpr($3, @1); }
  | SUM '(' IDENTIFIER ')' 
  { $$ = new SumExpr($3, @1); }
  | AVERAGE '(' IDENTIFIER ')' 
  { $$ = new AverageExpr($3, @1); }
;

logical
  : expression '||' expression
  { $$ = new BinaryExpr($1, '||', $3, @2) }
  | expression '&&' expression
  { $$ = new BinaryExpr($1, '&&', $3, @2) }
  | '!' expression
  { $$ = new UnaryExpr('!', $2, @1) }
;

function_call
  : IDENTIFIER '(' arguments ')'
    { $$ = new FunctionCallExpr($1, $3, @1); }
;

arguments
  : argument_list
  | /* empty */
    { $$ = []; }
;

argument_list
  : argument_list ',' expression
    { $1.push($3); $$ = $1; }
  | expression
    { $$ = [$1]; }
;

ternary
  : 'IF' '(' expression ')' expression ':' expression
  { $$ = new TernaryExpr($3, $5, $7, @1) }
;

casteo
  : CAST '(' expression AS type ')'
  { $$ = new CastExpr($3, $5, @1) }
;

increment_decrement
  : IDENTIFIER '++'
  { $$ = new IncrementExpr($1, @1) }
  | IDENTIFIER '--'
  { $$ = new DecrementExpr($1, @1) }
;

arithmetic
  : expression '+' expression
  {$$ = new BinaryExpr($1, $2, $3, @2) }
  | expression '-' expression
  {$$ = new BinaryExpr($1, $2, $3, @2) }
  | expression '*' expression
  {$$ = new BinaryExpr($1, $2, $3, @2) }
  | expression '/' expression
  {$$ = new BinaryExpr($1, $2, $3, @2) }
  | expression '^' expression
  {$$ = new BinaryExpr($1, $2, $3, @2) }
  | expression '$' expression
  {$$ = new BinaryExpr($1, $2, $3, @2) }
  | expression '%' expression
  {$$ = new BinaryExpr($1, $2, $3, @2) }
;

relational
  : expression '==' expression
  { $$ = new BinaryExpr($1, $2, $3, @1) }
  | expression '!=' expression
  { $$ = new BinaryExpr($1, $2, $3, @1) }
  | expression '<=' expression
  { $$ = new BinaryExpr($1, $2, $3, @1) }
  | expression '>=' expression
  { $$ = new BinaryExpr($1, $2, $3, @1) }
  | expression '<' expression
  { $$ = new BinaryExpr($1, $2, $3, @1) }
  | expression '>' expression
  { $$ = new BinaryExpr($1, $2, $3, @1) }
;

literal
  : INT_LITERAL
  { $$ = new LiteralExpr($1, 'INT', @1) }
  | DOUBLE_LITERAL
  { $$ = new LiteralExpr($1, 'DOUBLE', @1) }
  | TRUE_LITERAL
  { $$ = new LiteralExpr($1, 'BOOL', @1) }
  | FALSE_LITERAL
  { $$ = new LiteralExpr($1, 'BOOL', @1) }
  | STRING_LITERAL
  { $$ = new LiteralExpr($1, 'STRING', @1) }
  | NULL
  { $$ = new LiteralExpr($1, 'NULL', @1) }
;

type
  : INT
  | DOUBLE
  | BOOL
  | CHAR
  | STRING
  | NULL
;
export const mapOperator = (operator : string) => {
    let operatorMapped = '';

    switch (operator) {
        case '>':
            operatorMapped = 'mayor que';
        break;
        case '<':
            operatorMapped = 'menor que';
        break;
        case '=':
            operatorMapped = 'igual que';
        break;
        case 'diferente':
            operatorMapped = 'diferente que';
        break;
        default:
            break;
    }
    return operatorMapped;
}
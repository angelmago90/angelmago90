/**
@section DATASET
*/
const clients = [
{ id: 1, rut: "89873550", name: "LARA RENE PETTY BERGER" },
{ id: 2, rut: "86833361", name: "CONWAY LANDRY POLLARD BRADLEY" },
{ id: 3, rut: "88271452", name: "MICHELLE LETITIA BATTLE MOONEY" },
{ id: 4, rut: "87252013", name: "SIMMONS NELSON WITT MONROE" },
{ id: 5, rut: "81706494", name: "BRADY MARY RANDALL FERNANDEZ" },
{ id: 6, rut: "71167355", name: "ACOSTA COLE ATKINSON PITTS" },
{ id: 7, rut: "79093176", name: "DOMINGUEZ HOUSE GONZALES SALAZAR" },
{ id: 8, rut: "91361017", name: "KIRSTEN COLLINS BYERS COFFEY" },
{ id: 9, rut: "9065642K", name: "FIELDS RATLIFF MORRIS QUINN" }
];
const banks = [
{ id: 1, name: 'SCOTIABANK' },
{ id: 2, name: 'BCI' },
{ id: 3, name: 'ITAU' },
{ id: 4, name: 'CONDELL' },
];
const accounts = [
{ clientId: 4, bankId: 1, balance: 79069 },
{ clientId: 6, bankId: 3, balance: 136060 },
{ clientId: 9, bankId: 3, balance: 74908 },
{ clientId: 2, bankId: 2, balance: 4391 },
{ clientId: 6, bankId: 2, balance: 116707 },
{ clientId: 1, bankId: 3, balance: 157627 },
{ clientId: 5, bankId: 4, balance: 136372 },
{ clientId: 7, bankId: 4, balance: 190204 },
{ clientId: 5, bankId: 4, balance: 149670 },
{ clientId: 2, bankId: 3, balance: 143321 },
{ clientId: 2, bankId: 4, balance: 67466 },
{ clientId: 2, bankId: 3, balance: 17956 },
{ clientId: 9, bankId: 2, balance: 43194 },
{ clientId: 5, bankId: 1, balance: 52245 },
{ clientId: 6, bankId: 2, balance: 41562 },
{ clientId: 3, bankId: 2, balance: 138046 },
{ clientId: 6, bankId: 3, balance: 196964 },
{ clientId: 8, bankId: 3, balance: 73803 },
{ clientId: 9, bankId: 2, balance: 150402 },
{ clientId: 7, bankId: 1, balance: 122869 },
{ clientId: 5, bankId: 4, balance: 65223 },
{ clientId: 7, bankId: 3, balance: 143589 },
{ clientId: 9, bankId: 3, balance: 43346 },
{ clientId: 2, bankId: 1, balance: 60421 },
{ clientId: 4, bankId: 4, balance: 184110 },
{ clientId: 8, bankId: 4, balance: 195903 },
{ clientId: 5, bankId: 2, balance: 77649 },
{ clientId: 8, bankId: 4, balance: 28170 },
{ clientId: 5, bankId: 1, balance: 132850 },
{ clientId: 1, bankId: 3, balance: 139679 },
{ clientId: 7, bankId: 4, balance: 119808 },
{ clientId: 4, bankId: 4, balance: 109201 },
{ clientId: 9, bankId: 3, balance: 112529 },
{ clientId: 1, bankId: 3, balance: 137914 },
{ clientId: 6, bankId: 2, balance: 122904 },
{ clientId: 5, bankId: 4, balance: 103142 },
{ clientId: 8, bankId: 2, balance: 69163 },
{ clientId: 2, bankId: 4, balance: 57812 },
{ clientId: 2, bankId: 3, balance: 32851 },
{ clientId: 7, bankId: 1, balance: 109763 },
{ clientId: 8, bankId: 3, balance: 147442 },
{ clientId: 9, bankId: 1, balance: 42217 },
{ clientId: 1, bankId: 1, balance: 39658 },
{ clientId: 6, bankId: 2, balance: 8664 },
{ clientId: 8, bankId: 1, balance: 41915 },
{ clientId: 7, bankId: 1, balance: 31879 },
{ clientId: 7, bankId: 4, balance: 117795 },
{ clientId: 1, bankId: 4, balance: 108862 },
{ clientId: 5, bankId: 1, balance: 18550 },
];

const unionClientsAccountsBanks = juntarClientsAccountsBanks();

function juntarClientsAccountsBanks() {
    var banksNewName = banks.map(bank => {
        return { bankId: bank.id, nameBank: bank.name };
    });
    var clientsNewName = clients.map(client => {
        return { clientId: client.id, taxNumber: client.rut, name: client.name };
    });

    const mergeByClientId = (a1, a2) =>
        a1.map(itm =>
            ({...a2.find((item) =>
                    (item.clientId === itm.clientId) && item),
                ...itm
            }));
    const mergeByBankId = (a1, a2) =>
        a1.map(itm =>
            ({...a2.find((item) =>
                    (item.bankId === itm.bankId) && item),
                ...itm
            }));

    let mergeClientsAccounts = mergeByClientId(accounts, clientsNewName);
    let mergeClientsAccountsBanks = mergeByBankId(mergeClientsAccounts, banksNewName);

    return mergeClientsAccountsBanks;
}

// 0 Arreglo con los ids de clientes
function listClientsIds() {
    return clients.map((clients) => clients.id);
};

// 1 Arreglo con los ids de clientes ordenados por rut
function listClientsIdsSortByTaxNumber(ascendente = true) {
    let clientsAux_ = clients.slice(0, clients.length);
    let clientsOrderByRut = clientsAux_.sort(function(a, b) {
        let aSinDigitoVerificador = a.rut.slice(0, a.rut.length - 1);
        let bSinDigitoVerificador = b.rut.slice(0, b.rut.length - 1);
        if (ascendente) {
            return aSinDigitoVerificador - bSinDigitoVerificador;
        } else {
            return bSinDigitoVerificador - aSinDigitoVerificador;
        }
    });
    return clientsOrderByRut.map((clientsOrderByRut) => clientsOrderByRut.id);
};

// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
function sortClientsTotalBalances(cuentas = accounts, clientes = clients) {
    let balancesTotalesPorCliente = cuentas.reduce((contadorTotales, cadaElemento) => {
        contadorTotales[cadaElemento.clientId] = (contadorTotales[cadaElemento.clientId] || 0) + cadaElemento.balance;
        return contadorTotales;
    }, {});

    let balanceTotalPorClienteOrdenados = Object.keys(balancesTotalesPorCliente).sort(
        function(a, b) {
            return balancesTotalesPorCliente[b] - balancesTotalesPorCliente[a]
        });
    // Obtener nombres por id
    for (let x in balanceTotalPorClienteOrdenados) {
        for (let y in clientes) {
            if (clientes[y].id == balanceTotalPorClienteOrdenados[x]) {
                balanceTotalPorClienteOrdenados[x] = clientes[y].name;
            }
        }
    }
    return balanceTotalPorClienteOrdenados;
}

// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
function banksClientsTaxNumbers() {
    var objectBankClient = {};
    for (let bank in banks) {
        let nombreClientesPorBanco = unionClientsAccountsBanks.filter((client) => {
            return client.nameBank === banks[bank].name
        }).map(client => client.name).sort()

        let valorUnicoNombreClientesPorBanco = Array.from(new Set(nombreClientesPorBanco));
        let contenedorDeClientes = [];
        for (let index in valorUnicoNombreClientesPorBanco) {
            existeCliente = clients.filter(client => {
                return client.name === valorUnicoNombreClientesPorBanco[index]
            });
            if (existeCliente.length > 0) {
                contenedorDeClientes.push(existeCliente[0]);
            }
        }
        objectBankClient[banks[bank].name] = contenedorDeClientes.map(client => client.rut);

    }
    return objectBankClient;
}

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
function richClientsBalances() {
    return unionClientsAccountsBanks.filter(client => client.nameBank === 'SCOTIABANK' && client.balance > 25000)
        .map((client) => client.balance).sort((a, b) => b - a);
}

// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
function banksRankingByTotalBalance() {
    let bankEstruct = accounts.reduce((contadorTotales, cadaElemento) => {
        contadorTotales[cadaElemento.bankId] = (contadorTotales[cadaElemento.bankId] || 0) + cadaElemento.balance;
        return contadorTotales;
    }, {});
    return Object.keys(bankEstruct).sort(function(a, b) { return bankEstruct[a] - bankEstruct[b] })
}

// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
function banksFidelity() {
    let bankList = [];
    for (let indexClient in clients) {
        let userCountBank = Array.from(new Set(unionClientsAccountsBanks.filter(client => {
            return client.clientId === clients[indexClient].id;
        }).map(client => {
            return client.nameBank;
        })));
        if (userCountBank.length === 1) {
            bankList.push(userCountBank);
        }
    }
    bankList = bankList.reduce((contadorTotales, cadaElemento) => {
        contadorTotales[cadaElemento] = (contadorTotales[cadaElemento] || 0) + 1;
        return contadorTotales;
    }, {});
    // Llena de 0 los bancos que no obtuvieron clientes unicos
    for (let indexBank in banks) {
        if (!Object.keys(bankList).find(a => {
                return banks[indexBank].name === a
            })) {
            bankList[banks[indexBank].name] = 0;
        }
    }
    return bankList;
}

// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
function banksPoorClients() {
    let banco = {};
    for (let indexBank in banks) {
        let totalBalanceByClient = (unionClientsAccountsBanks.filter(a => a.nameBank === banks[indexBank].name)
            .reduce((contadorTotales, cadaElemento) => {
                contadorTotales[cadaElemento.clientId] = (contadorTotales[cadaElemento.clientId] || 0) + cadaElemento.balance;
                return contadorTotales
            }, {}));
        // Se recorren los clientes y se deja el menor con su respectivo banco
        for (let index in totalBalanceByClient) {
            if (totalBalanceByClient[index] === Math.min(...Object.values(totalBalanceByClient))) {
                banco[banks[indexBank].name] = index;
            }
        }
    }
    return banco;
}

// Impresión de soluciones. No modificar.
console.log('Pregunta 0');
console.log('Respuesta'+' '+listClientsIds());
console.log('Pregunta 1');
console.log('Respuesta'+' '+listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log('Respuesta'+' '+sortClientsTotalBalances());
console.log('Pregunta 3');
console.log('Respuesta'+' '+banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log('Respuesta'+' '+richClientsBalances());
console.log('Pregunta 5');
console.log('Respuesta'+' '+banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log('Respuesta'+' '+banksFidelity());
console.log('Pregunta 7');
console.log('Respuesta'+' '+banksPoorClients());

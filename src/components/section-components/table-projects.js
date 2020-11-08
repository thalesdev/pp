
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

const TableProjects = ({ property }) => {
	return (
		<div className="container">

			<div className="section-title text-left">
				<h2 className="title"> Informações sobre Unidades* </h2>
			</div>
			<table className="table">
				<thead className="thead-light">
					<tr>
						<th scope="col">Área</th>
						<th scope="col">Quartos</th>
						<th scope="col">Banheiros</th>
						<th scope="col">Suites</th>
						<th scope="col">Vagas</th>
						<th scope="col">Preço</th>
					</tr>
				</thead>
				<tbody>
					{property && property.unidades.map(unidade => (
						<tr key={unidade.id}>
							<th scope="row">{unidade.tamanho} m²</th>
							<td>{unidade.quantidade_dormitorios}</td>
							<td>{unidade.quantidade_banheiros}</td>
							<td>{unidade.quantidade_suites}</td>
							<td>{unidade.quantidade_vagas}</td>
							<td>
								<NumberFormat
									value={unidade.valor}
									displayType={'text'}
									thousandSeparator={'.'}
									decimalSeparator={','}
									prefix={'R$'}
								/></td>
						</tr>
					))}


				</tbody>
			</table>

			<p> *Consulte a disponibilidade de unidades. </p>
			<p> *Preço e referência poderá ser alterado a qualquer momento, sem aviso prévio.</p>
		</div>
	);
};
export default TableProjects
import styled from 'styled-components';

const Card = () => {
	return (
		<CardContainer>
			<CardHeader>
				<span>May 20th 2020</span>
				<CardHeight>Temática</CardHeight>
			</CardHeader>
			<CardContent>
				<CardTitle>Titular Noticia</CardTitle>
				<CardSkills>
					<span>#Tags</span>
					<span>#GoHipoteca</span>
				</CardSkills>
			</CardContent>
		</CardContainer>
	)
}

const CardHeight = styled.div`
	background-color: #34D350;
	border-radius: 20px;
	padding: 2px 10px;
`

const CardSkills = styled.div`
	display: flex;
	width: 100%;
	gap: 5px;
	color: #306D5E;
`

const CardTitle = styled.div`
	color: #205D3E;
	font-size: 1.5em;
	font-weight: bold;
`

const CardContent = styled.div`
	padding: 10px 25px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 30%;
`

const CardHeader = styled.div`
	color: #F0FEF6;
	display: flex;
	height: 70%;
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('https://img.business.com/w/700/aHR0cHM6Ly9pbWFnZXMuYnVzaW5lc3NuZXdzZGFpbHkuY29tL2FwcC91cGxvYWRzLzIwMjIvMDQvMDQwNzQ1NTMvMTU1NDI0NDAxMC5qcGVn');
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 20px 20px 0 0;
	justify-content: space-around;
	align-items: flex-end;
	padding: 10px;
`

const CardContainer = styled.div`
	display: inline-flex;
	border-radius: 20px;
	background-color: #FFF;
	margin: 20px;
	min-width: 300px;
	min-height: 300px;
	max-width: 300px;
	max-height: 300px;
	flex-direction: column;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const Cards = () => {
	return (
		<CardsContainer>
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
		</CardsContainer>
	)
}

const CardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

export default Cards

import styled from 'styled-components';

const Card = ({ date, height, title, skills, headerImageUrl }) => {
	return (
		<CardContainer>
			<CardHeader headerImageUrl={headerImageUrl}>
				<span>{date}</span>
				<CardHeight>{height}</CardHeight>
			</CardHeader>
			<CardContent>
				<CardTitle>{title}</CardTitle>
				<CardSkills>
					{skills.map(item => <span>#{item}</span>)}
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
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('${props => props.headerImageUrl}');
	background-repeat: no-repeat;
	background-size: contains;
	background-position: center;
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

const Cards = ({ records }) => {
	return (
		<CardsContainer>
			{records?.map(item => (
				<Card
					key={item.name}
					date={'June 23th, 2023'}
					height={`${item.height} ft`}
					title={item.name}
					skills={item.skills}
					headerImageUrl={item.image}/>
			))}
		</CardsContainer>
	)
}

const CardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

export default Cards

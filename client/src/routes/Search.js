import React from 'react';
import styled, {css} from 'styled-components';
import {Route} from "react-router-dom";
import SearchIcon from "../../node_modules/@material-ui/icons/Search";
import BackIcon from '@material-ui/icons/ArrowBack';

let S = {};
S.Container = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`;

S.Result = styled.div`

`;

S.Bar = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  box-shadow: 0 0 6px 1px #00000063;
  padding-bottom: 10px;
  //background: aliceblue;
`;

S.Back = styled.div`
    margin: 5px;
    padding: 5px 5px 5px 8px;  
`;

S.BackIcon = styled(BackIcon)`
  margin-left: auto;
  margin-right: 12px;
  cursor: pointer;
`;

S.Input = styled.input`
    margin: 5px;
    padding: 5px 5px 5px 8px;
    outline: none;
    border: black solid 0;
`;

class Search extends React.Component {
    render() {
        return (
            <Route render={({history}) => (
                <S.Container>
                    <S.Bar>
                        <S.Back onClick={e => history.goBack()}>
                            <S.BackIcon/>
                        </S.Back>
                        <S.Input/>
                    </S.Bar>
                    <S.Result>
                        This is my list.
                    </S.Result>
                </S.Container>)}
            />
        )
    }
}

export default Search;
import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Incrementor from '../../../../../shared/components/incrementor';
import { toast } from 'react-toastify';

const Content = styled.form`
    display: flex;
    flex-direction: column;
    flex-basis: 400px;
    max-width: 800px;
    margin: auto;
`;

const Flex = styled.div`
    display: flex;
    justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
`;

const MealOptionConfig = ({
    onSave,
    mealOptions: savedMealOptions = [],
    onLoad
}) => {
    const getSavedOptions = () =>
        savedMealOptions.reduce(
            (acc, curr, i) => ({
                ...acc,
                [`mealOption${i}`]: curr
            }),
            {}
        );
    React.useEffect(() => {
        onLoad();
    }, []);
    const [optionCount, setOptionCount] = React.useState(
        savedMealOptions.length || 1
    );
    const [mealOptions, setMealOptions] = React.useState(getSavedOptions());
    const [saved, setSaved] = React.useState(savedMealOptions);
    React.useEffect(() => {
        if (savedMealOptions.length !== saved.length) {
            setSaved(savedMealOptions);
            setMealOptions(getSavedOptions());
            setOptionCount(savedMealOptions.length);
        }
    });

    const onSubmit = async e => {
        e.preventDefault();
        await onSave({
            mealOptions: Object.entries(mealOptions).map(
                ([_, { name }]) => name
            )
        });
        toast('Updated Meal Options');
    };
    return (
        <Content onSubmit={onSubmit} method="POST">
            <Typography variant="h4">Meal Options</Typography>
            <Incrementor
                onAdd={() => setOptionCount(optionCount + 1)}
                onRemove={() => {
                    setMealOptions({
                        ...mealOptions,
                        [`mealOption${optionCount - 1}`]: undefined
                    });
                    setOptionCount(optionCount - 1);
                }}
                hideRemove={optionCount <= 1}
            />
            {Array(optionCount)
                .fill(1)
                .map((item, i) => {
                    console.log(mealOptions, optionCount);
                    return (
                        <Flex className="mb-4" key={`mealOption${i}`}>
                            <TextField
                                name={`mealOption${i}`}
                                value={
                                    mealOptions[`mealOption${i}`] &&
                                    mealOptions[`mealOption${i}`].name
                                }
                                type="text"
                                className="flex-grow-1"
                                InputLabelProps={{
                                    shrink:
                                        !!mealOptions[`mealOption${i}`] &&
                                        !!mealOptions[`mealOption${i}`].name
                                }}
                                label={`Meal Option ${
                                    optionCount > 1 ? i + 1 : ''
                                }`}
                                onChange={e => {
                                    let mo = { ...mealOptions };
                                    mo[`mealOption${i}`] = {
                                        ...mo[`mealOption${i}`],
                                        name: e.target.value
                                    };
                                    setMealOptions(mo);
                                }}
                            />
                        </Flex>
                    );
                })}
            <Flex justify="flex-end">
                <Button type="submit" color="primary" variant="contained">
                    Save
                </Button>
            </Flex>
        </Content>
    );
};

export default MealOptionConfig;

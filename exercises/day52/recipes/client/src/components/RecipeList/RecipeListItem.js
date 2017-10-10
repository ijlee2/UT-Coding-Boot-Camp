import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

const parser = new DOMParser();

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const RecipeListItem = props => {
    const recipe = props.recipe;

    const dom   = parser.parseFromString(`<!doctype html><body>${recipe.title}`, 'text/html');
    const title = dom.body.textContent;

    return (
        <li className="list-group-item">
            <Container>
                <Row>
                    <Col size="xs-4 sm-2">
                        <Thumbnail src={recipe.thumbnail} />
                    </Col>

                    <Col size="xs-8 sm-9">
                        <h3>{title}</h3>
                        <p>
                            Ingredients: {recipe.ingredients}
                        </p>
                        <a
                            rel="noreferrer noopener"
                            target="_blank"
                            href={recipe.href}
                        >
                            Go to recipe!
                        </a>
                    </Col>
                </Row>
            </Container>
        </li>
    );
}
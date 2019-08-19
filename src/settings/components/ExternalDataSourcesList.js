import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Button, Layout } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import ExternalDataSourcesFields from './ExternalDataSourcesFields';

class ExternalDataSourcesList extends React.Component {
  static propTypes = {
    fields: PropTypes.shape({
      unshift: PropTypes.func.isRequired,
      value: PropTypes.array.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  handleDelete = (index) => {
    const { fields, onDelete } = this.props;
    const externalkb = fields.value[index];

    if (externalkb && externalkb.id) {
      onDelete(externalkb);
    } else {
      fields.remove(index);
    }
  }

  handleNew = () => {
    this.props.fields.unshift({});
  }

  handleSave = (index) => {
    const externalkb = this.props.fields.value[index];
    this.props.onSave(externalkb);
  }

  render() {
    const { fields, mutators } = this.props;
    return (
      <div>
        <Layout end="sm">
          <Button onClick={this.handleNew}>
            New
          </Button>
        </Layout>
        {
          fields.value.map((externalkb, i) => (
            <Field
              component={ExternalDataSourcesFields}
              isEqual={isEqual}
              mutators={mutators}
              key={(externalkb && externalkb.id) || i}
              name={`${fields.name}[${i}]`}
              onDelete={() => this.handleDelete(i)}
              onSave={() => this.handleSave(i)}
            />
          ))
        }
      </div>
    );
  }
}

export default ExternalDataSourcesList;

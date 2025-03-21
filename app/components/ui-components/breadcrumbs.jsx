import React from 'react';
import '../../styles/components/ui-components/breadcrumbs.scss';
import { Link } from 'react-router-dom'; // or remove this if using plain <a>

const Breadcrumbs = ({ items = [] }) => {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="breadcrumb-item active">{item.label}</span>
            ) : (
              <Link to={item.path} className="breadcrumb-item">
                {item.label}
              </Link>
            )}
            {!isLast && <span className="breadcrumb-separator">/</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

import '../styles/Feature.scss';
import Chip from '@material-ui/core/Chip';


interface FeatureProps {
    title: string,
    feature: [],
    featureName: string,
    showAsText?: boolean,
}

const Feature: React.FC<FeatureProps> = (props) => {
    const { feature, title, showAsText, featureName } = props;
    return (
        <div className="feature">
            <div className="feature-title">
                <span className="bullet">&#8226;</span> {title}: </div>
            {(showAsText && feature?.length) ?
                <p className="feature-text">{feature.map((item: any) => item[featureName].name + ", ")}</p> :
                feature.map((item: any) =>
                    <Chip key={item[featureName].name} color="primary" label={item[featureName].name} variant="outlined" />)}
        </div>
    )
}

export default Feature;
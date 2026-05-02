// Switch data source to import from fileUtilsRawfile for real devices
import dataSource from './fileUtilsInline'; // For simulator

export default {
    readAllPlaces: dataSource.readAllPlaces
};
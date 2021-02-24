export default class SensorDetecting {
    static sensorDetecting() {
        try{ document.createEvent("TouchEvent"); return true; }
        catch(e){ return false; }
    }
}
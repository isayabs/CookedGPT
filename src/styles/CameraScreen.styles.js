import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallScreen = SCREEN_HEIGHT < 750;

const VIEWFINDER_HEIGHT = isSmallScreen ? 300 : 420;
const SCAN_PADDING_VERTICAL = isSmallScreen ? 16 : 32;
const HINT_MARGIN_TOP = isSmallScreen ? -40 : -80;
const CONTROLS_PADDING_HORIZONTAL = isSmallScreen ? 20 : 32;
const ICON_FONT_SIZE = isSmallScreen ? 24 : 28;
const LABEL_FONT_SIZE = isSmallScreen ? 10 : 11;
const CAPTURE_BTN_SIZE = isSmallScreen ? 64 : 72;
const CAPTURE_BTN_INNER_SIZE = isSmallScreen ? 50 : 56;

export const ACCENT = '#C76649';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    
    // Tab bar
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    tabItemActive: {
        borderBottomColor: ACCENT,
    },
    tabLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#999',
    },
    tabLabelActive: {
        color: ACCENT,
        fontWeight: '700',
    },

    // Scan tab
    scanContainer: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SCAN_PADDING_VERTICAL,
    },
    viewfinderWrap: {
        width: '92%',
        height: VIEWFINDER_HEIGHT,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewfinder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
    },
    cornerTL: {
        position: 'absolute',
        top: -10,
        left: -10,
        width: 42,
        height: 42,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#fff',
    },
    cornerTR: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 42,
        height: 42,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: '#fff',
    },
    cornerBL: {
        position: 'absolute',
        bottom: -10,
        left: -10,
        width: 42,
        height: 42,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#fff',
    },
    cornerBR: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        width: 42,
        height: 42,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#fff',
    },
    viewfinderHint: {
        color: '#aaa',
        fontSize: 13,
        alignSelf: 'center',
        marginTop: HINT_MARGIN_TOP,
    },
    scanControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: CONTROLS_PADDING_HORIZONTAL,
    },
    iconBtn: {
        alignItems: 'center',
    },
    iconBtnText: {
        fontSize: ICON_FONT_SIZE,
    },
    iconBtnLabel: {
        color: '#fff',
        fontSize: LABEL_FONT_SIZE,
        marginTop: 4,
    },
    captureBtn: {
        width: CAPTURE_BTN_SIZE,
        height: CAPTURE_BTN_SIZE,
        borderRadius: CAPTURE_BTN_SIZE / 2,
        borderWidth: 4,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureBtnInner: {
        width: CAPTURE_BTN_INNER_SIZE,
        height: CAPTURE_BTN_INNER_SIZE,
        borderRadius: CAPTURE_BTN_INNER_SIZE / 2,
        backgroundColor: '#fff',
    },
    messageArea: {
        alignItems: 'center',
        minHeight: 40,
        justifyContent: 'center',
        },

    // Add tab
    addContainer: {
        flex: 1,
    },
    addContent: {
        padding: 16,
        paddingBottom: 32,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
        marginTop: 20,
        marginBottom: 10,
    },
    chipsRow: {
        gap: 8,
        paddingBottom: 4,
    },
    chip: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    chipText: {
        fontSize: 13,
        color: '#333',
    },
    chipPlus: {
        fontSize: 13,
        color: ACCENT,
        fontWeight: '700',
    },
    yourChipsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chipSelected: {
        flexDirection: 'row',
        backgroundColor: ACCENT,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        alignItems: 'center',
    },
    chipSelectedText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '500',
    },
    chipRemove: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 16,
        height: 44,
        marginTop: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    clearBtn: {
        paddingLeft: 8,
    },
    clearBtnText: {
        fontSize: 14,
        color: '#aaa',
    },
    emptyHint: {
        color: '#aaa',
        fontSize: 13,
        fontStyle: 'italic',
    },
    resultCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 10,
        padding: 14,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    resultInfo: {
        flex: 1,
    },
    resultName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222',
        marginBottom: 2,
    },
    resultCategory: {
        fontSize: 11,
        color: ACCENT,
        fontWeight: '500',
        marginBottom: 6,
    },
    resultMeta: {
        flexDirection: 'row',
        gap: 10,
    },
    resultMetaText: {
        fontSize: 12,
        color: '#777',
    },
    findBtn: {
        marginTop: 32,
        backgroundColor: ACCENT,
        borderRadius: 28,
        paddingVertical: 16,
        alignItems: 'center',
    },
    findBtnDisabled: {
        backgroundColor: '#ccc',
    },
    findBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    });
    
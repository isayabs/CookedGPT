import { StyleSheet } from 'react-native';

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
        paddingVertical: 32,
    },
    viewfinderWrap: {
        width: '92%',
        height: 420,
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
        marginTop: -80
        },
    scanControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 32,
    },
    iconBtn: {
        alignItems: 'center',
    },
    iconBtnText: {
        fontSize: 28,
    },
    iconBtnLabel: {
        color: '#fff',
        fontSize: 11,
        marginTop: 4,
    },
    captureBtn: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 4,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureBtnInner: {
        width: 56,
        height: 56,
        borderRadius: 28,
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
    
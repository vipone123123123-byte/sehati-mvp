import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const tabs = ['الرئيسية', 'المواعيد', 'السجل', 'الملف'];

const appointments = [
  { doctor: 'د. ريم السعيد', date: 'الأحد، 10:30 صباحاً', type: 'متابعة', color: '#19A7CE' },
  { doctor: 'د. فواز الخالدي', date: 'الأربعاء، 15:00 مساءً', type: 'فحص', color: '#6BCB77' },
  { doctor: 'د. لينا النعيمي', date: 'السبت، 09:00 صباحاً', type: 'تحليل', color: '#FF9F43' },
];

const records = [
  { title: 'نتيجة تحليل سكر الدم', date: '15 يونيو 2026', status: 'طبيعي', color: '#4CAF50' },
  { title: 'تقرير ضغط الدم', date: '04 يونيو 2026', status: 'مستقر', color: '#2196F3' },
  { title: 'ملف متابعة القلب', date: '20 مايو 2026', status: 'مراجعة', color: '#FFB74D' },
];

const medications = ['أومبرازول 20mg', 'فيتامين D3', 'لوسارتان 50mg'];

const patientProfile = {
  name: 'أحمد المعيبد',
  age: '32 سنة',
  blood: 'A+',
  phone: '+966 55 123 4567',
  conditions: ['سكري نوع 2', 'ضغط منخفض'],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('الرئيسية');

  const renderHome = () => (
    <View style={styles.contentBox}>
      <Text style={styles.sectionTitle}>نظرة عامة</Text>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, styles.primaryCard]}>
          <Ionicons name="heart-outline" size={24} color="#ffffff" />
          <Text style={styles.statLabel}>مؤشرات صحية</Text>
          <Text style={styles.statValue}>96%</Text>
        </View>

        <View style={[styles.statCard, styles.secondaryCard]}>
          <Ionicons name="calendar-outline" size={24} color="#ffffff" />
          <Text style={styles.statLabel}>مواعيد</Text>
          <Text style={styles.statValue}>3</Text>
        </View>
      </View>

      <View style={styles.cardBlock}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.sectionTitle}>أدوية اليوم</Text>
          <Text style={styles.linkText}>عرض الكل</Text>
        </View>
        {medications.map((item) => (
          <View key={item} style={styles.listRow}>
            <View style={styles.medicineDot} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardBlock}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.sectionTitle}>المواعيد القادمة</Text>
          <Text style={styles.linkText}>جدول</Text>
        </View>
        {appointments.slice(0, 2).map((appointment) => (
          <View key={appointment.doctor} style={styles.appointmentItem}>
            <View style={[styles.badge, { backgroundColor: appointment.color }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
              <Text style={styles.appointmentMeta}>{appointment.date}</Text>
            </View>
            <Text style={styles.appointmentType}>{appointment.type}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAppointments = () => (
    <View style={styles.contentBox}>
      <Text style={styles.sectionTitle}>جدول المواعيد</Text>
      {appointments.map((item) => (
        <View key={item.doctor} style={styles.appointmentCard}>
          <View style={styles.appointmentIconWrap}>
            <Ionicons name="calendar-clear-outline" size={22} color="#ffffff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.appointmentDoctor}>{item.doctor}</Text>
            <Text style={styles.appointmentMeta}>{item.date}</Text>
            <Text style={styles.appointmentType}>{item.type}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderRecords = () => (
    <View style={styles.contentBox}>
      <Text style={styles.sectionTitle}>السجل الطبي</Text>
      {records.map((record) => (
        <View key={record.title} style={styles.recordCard}>
          <View style={[styles.recordColor, { backgroundColor: record.color }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.recordTitle}>{record.title}</Text>
            <Text style={styles.recordDate}>{record.date}</Text>
          </View>
          <Text style={[styles.recordStatus, { color: record.color }]}>{record.status}</Text>
        </View>
      ))}
    </View>
  );

  const renderProfile = () => (
    <View style={styles.contentBox}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>أ</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>{patientProfile.name}</Text>
          <Text style={styles.profileMeta}>{patientProfile.age} • {patientProfile.blood}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>رقم الهاتف</Text>
        <Text style={styles.infoValue}>{patientProfile.phone}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>الحالات</Text>
        {patientProfile.conditions.map((condition) => (
          <Text key={condition} style={styles.infoValue}>• {condition}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>تحديث الملف الصحي</Text>
      </TouchableOpacity>
    </View>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'المواعيد':
        return renderAppointments();
      case 'السجل':
        return renderRecords();
      case 'الملف':
        return renderProfile();
      default:
        return renderHome();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>مرحباً بك</Text>
          <Text style={styles.headerTitle}>صحتي</Text>
        </View>
        <View style={styles.notificationBubble}>
          <Ionicons name="notifications-outline" size={22} color="#1A3C61" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>{renderActiveTab()}</ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          const iconName =
            tab === 'الرئيسية'
              ? 'home-outline'
              : tab === 'المواعيد'
                ? 'calendar-outline'
                : tab === 'السجل'
                  ? 'document-text-outline'
                  : 'person-outline';

          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
            >
              <Ionicons name={iconName} size={20} color={isActive ? '#ffffff' : '#536B7B'} />
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerGreeting: {
    fontSize: 14,
    color: '#597387',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 32,
    color: '#0B2D4D',
    fontWeight: '700',
  },
  notificationBubble: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  contentBox: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#112B46',
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  primaryCard: {
    backgroundColor: '#1BA9C9',
  },
  secondaryCard: {
    backgroundColor: '#6C5CE7',
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
  },
  cardBlock: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#0D1B2A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    color: '#1A8FC8',
    fontWeight: '600',
    fontSize: 13,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  medicineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#19A7CE',
  },
  listText: {
    color: '#23415F',
    fontSize: 15,
    fontWeight: '600',
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  badge: {
    width: 12,
    height: 36,
    borderRadius: 8,
  },
  appointmentDoctor: {
    color: '#102B45',
    fontSize: 16,
    fontWeight: '700',
  },
  appointmentMeta: {
    color: '#5A738C',
    fontSize: 13,
    marginTop: 2,
  },
  appointmentType: {
    color: '#1A8FC8',
    fontWeight: '700',
    fontSize: 12,
    backgroundColor: '#EAF7FC',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#091825',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  appointmentIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#1DA7C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#091825',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  recordColor: {
    width: 12,
    height: 52,
    borderRadius: 12,
  },
  recordTitle: {
    color: '#102B45',
    fontWeight: '700',
    fontSize: 15,
  },
  recordDate: {
    color: '#5A738C',
    fontSize: 12,
    marginTop: 4,
  },
  recordStatus: {
    fontWeight: '700',
    fontSize: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#EAF7FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0E5FA8',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#102B45',
  },
  profileMeta: {
    fontSize: 13,
    color: '#597387',
    marginTop: 3,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
  },
  infoLabel: {
    fontSize: 13,
    color: '#5A738C',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    color: '#102B45',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#1BA9C9',
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#0A1320',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
  },
  activeTabButton: {
    backgroundColor: '#1BA9C9',
  },
  tabText: {
    marginTop: 4,
    color: '#536B7B',
    fontSize: 10,
    fontWeight: '700',
  },
  activeTabText: {
    color: '#ffffff',
  },
});

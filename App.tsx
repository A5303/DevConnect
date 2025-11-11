import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert, TextInput, Switch } from 'react-native';

// ===== YOUR PORTFOLIO DATA =====
const portfolioData = {
  name: "Magdaline Kiarie",
  title: "Software Developer",
  bio: "Passionate software developer skilled in mobile development with React Native. Building innovative solutions and continuously learning new technologies.",
  projects: [
    { 
      name: "DevConnect Mobile", 
      description: "A React Native portfolio app for developers to showcase their GitHub profiles",
      tech: ["React Native", "TypeScript", "Expo", "Navigation"],
      status: "Completed"
    },
    { 
      name: "Portfolio App", 
      description: "Mobile-first portfolio application with real-time data display",
      tech: ["React Native", "JavaScript", "Mobile UI/UX"],
      status: "In Progress"
    },
  ],
  skills: [
    { name: "React Native", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Git & GitHub", level: "Advanced" },
    { name: "Mobile Development", level: "Intermediate" },
  ],
  links: {
    github: "https://github.com/A5303",
    linkedin: "https://www.linkedin.com/in/magdaline-kiarie-041848207/",
    email: "Magdaline.kiarie00@gmail.com"
  }
};

// ===== MAIN APP COMPONENT =====
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [username, setUsername] = useState('A5303');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  // ===== SCREEN COMPONENTS =====
  
  const WelcomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>DevConnect</Text>
      <Text style={styles.subtitle}>Your GitHub portfolio in your pocket</Text>
      
      <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => setCurrentScreen('portfolio')}>
        <Text style={styles.buttonText}>View My Portfolio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => setCurrentScreen('github')}>
        <Text style={styles.buttonText}>Search GitHub Users</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.githubButton]} onPress={() => Linking.openURL(portfolioData.links.github)}>
        <Text style={styles.buttonText}>My GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={() => setCurrentScreen('settings')}>
        <Text style={styles.outlineButtonText}>App Settings</Text>
      </TouchableOpacity>
    </View>
  );

  const PortfolioScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('welcome')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{portfolioData.name}</Text>
        <Text style={styles.jobTitle}>{portfolioData.title}</Text>
        <Text style={styles.bio}>{portfolioData.bio}</Text>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'projects' && styles.activeTab]} 
          onPress={() => setActiveTab('projects')}
        >
          <Text style={[styles.tabText, activeTab === 'projects' && styles.activeTabText]}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'skills' && styles.activeTab]} 
          onPress={() => setActiveTab('skills')}
        >
          <Text style={[styles.tabText, activeTab === 'skills' && styles.activeTabText]}>Skills</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contact' && styles.activeTab]} 
          onPress={() => setActiveTab('contact')}
        >
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <View>
          <Text style={styles.sectionTitle}>My Projects</Text>
          {portfolioData.projects.map((project, index) => (
            <View key={index} style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                <View style={[styles.statusBadge, 
                  project.status === 'Completed' ? styles.statusCompleted :
                  project.status === 'In Progress' ? styles.statusProgress : styles.statusPlanning
                ]}>
                  <Text style={styles.statusText}>{project.status}</Text>
                </View>
              </View>
              <Text style={styles.projectDesc}>{project.description}</Text>
              <View style={styles.techContainer}>
                {project.tech.map((tech, techIndex) => (
                  <Text key={techIndex} style={styles.techTag}>{tech}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <View>
          <Text style={styles.sectionTitle}>Skills & Technologies</Text>
          {portfolioData.skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <View style={styles.skillInfo}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillLevel}>{skill.level}</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[
                  styles.skillProgress,
                  { width: skill.level === 'Advanced' ? '90%' : skill.level === 'Intermediate' ? '70%' : '50%' }
                ]} />
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <View>
          <Text style={styles.sectionTitle}>Get In Touch</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactText}>I'm available for new opportunities and collaborations!</Text>
            
            <View style={styles.contactButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.githubButton]}
                onPress={() => Linking.openURL(portfolioData.links.github)}
              >
                <Text style={styles.buttonText}>View GitHub</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.linkedinButton]}
                onPress={() => Linking.openURL(portfolioData.links.linkedin)}
              >
                <Text style={styles.buttonText}>LinkedIn Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.emailButton]}
                onPress={() => Linking.openURL(`mailto:${portfolioData.links.email}`)}
              >
                <Text style={styles.buttonText}>Send Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );

  const GitHubSearchScreen = () => {
    const openGitHubProfile = () => {
      if (username.trim()) {
        Linking.openURL(`https://github.com/${username}`);
        if (!searchHistory.includes(username)) {
          setSearchHistory(prev => [username, ...prev.slice(0, 4)]);
        }
      } else {
        Alert.alert('Error', 'Please enter a GitHub username');
      }
    };

    const clearHistory = () => {
      setSearchHistory([]);
    };

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('welcome')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>GitHub Search</Text>
        <Text style={styles.subtitle}>Enter a GitHub username to view their profile</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>GitHub Username:</Text>
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor="#888"
          />
          <Text style={styles.currentUsername}>Currently viewing: {username}</Text>
          <Text style={styles.note}>Note: This opens the actual GitHub website</Text>
        </View>

        <TouchableOpacity style={[styles.button, styles.githubButton]} onPress={openGitHubProfile}>
          <Text style={styles.buttonText}>Open GitHub Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => Linking.openURL('https://github.com/A5303')}>
          <Text style={styles.buttonText}>View My GitHub</Text>
        </TouchableOpacity>

        {searchHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>
            {searchHistory.map((historyUser, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.historyItem}
                onPress={() => setUsername(historyUser)}
              >
                <Text style={styles.historyText}>{historyUser}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    );
  };

  const SettingsScreen = () => (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('welcome')}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>App Settings</Text>
      
      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Use dark theme throughout the app</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#2d8cff' }}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>About</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>DevConnect Mobile v1.0</Text>
          <Text style={styles.aboutText}>Built with React Native and TypeScript</Text>
          <Text style={styles.aboutText}>Developer: Magdaline Kiarie</Text>
        </View>
      </View>
    </ScrollView>
  );

  // ===== RENDER CURRENT SCREEN =====
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'portfolio':
        return <PortfolioScreen />;
      case 'github':
        return <GitHubSearchScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return renderScreen();
}

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#2d8cff',
  },
  secondaryButton: {
    backgroundColor: '#6e5494',
  },
  githubButton: {
    backgroundColor: '#6e5494',
  },
  linkedinButton: {
    backgroundColor: '#0077b5',
  },
  emailButton: {
    backgroundColor: '#ea4335',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2d8cff',
  },
  outlineButtonText: {
    color: '#2d8cff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#2d8cff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    color: '#2d8cff',
    marginBottom: 15,
    fontWeight: '600',
  },
  bio: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 5,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2d8cff',
  },
  tabText: {
    color: '#888',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  projectCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  projectDesc: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 12,
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusCompleted: {
    backgroundColor: '#34a853',
  },
  statusProgress: {
    backgroundColor: '#f9ab00',
  },
  statusPlanning: {
    backgroundColor: '#ea4335',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techTag: {
    backgroundColor: '#3a3a3a',
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  skillItem: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  skillInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  skillLevel: {
    fontSize: 14,
    color: '#888888',
  },
  skillBar: {
    height: 6,
    backgroundColor: '#3a3a3a',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillProgress: {
    height: '100%',
    backgroundColor: '#2d8cff',
    borderRadius: 3,
  },
  contactCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  contactButtons: {
    gap: 10,
  },
  inputContainer: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#3a3a3a',
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  currentUsername: {
    fontSize: 18,
    color: '#2d8cff',
    fontWeight: '600',
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    color: '#888888',
    fontStyle: 'italic',
  },
  historyContainer: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  clearText: {
    color: '#ea4335',
    fontWeight: '600',
  },
  historyItem: {
    padding: 12,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    marginBottom: 8,
  },
  historyText: {
    color: '#ffffff',
    fontSize: 14,
  },
  settingsSection: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#888888',
  },
  aboutCard: {
    gap: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#cccccc',
  },
});
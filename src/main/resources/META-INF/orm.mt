<?xml version="1.0" encoding="UTF-8" ?>
<entity-mappings xmlns="http://www.datanucleus.org/xsd/jpa/orm"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.datanucleus.org/xsd/jpa/orm
        http://www.datanucleus.org/xsd/jpa/orm_2_1.xsd" version="2.1">
        
  <description>JPA Mapping file for DataNucleus for GAE Datastore</description>
  <package>com.signaldata.model</package>
  
  <entity class="com.signaldata.model.Country" name="Country">
    <table name="Country"/>
    <attributes>
      <id name="countryID">
        <generated-value strategy="IDENTITY"/>
      </id>
      <basic name="name">
        <column name="Name"/>
      </basic>
      <basic name="code">
        <column name="CountryCode" />
      </basic>
    </attributes>
  </entity>
  
  <entity class="com.signaldata.model.Location" name="Location">
    <table name="Location"/>
    <attributes>
      <id name="locationID">
        <generated-value strategy="IDENTITY"/>
      </id>
      <basic name="latitude">
        <column name="Latitude" precision="16" scale="6" />
      </basic>
      <basic name="longitude">
        <column name="Longitude" precision="16" scale="6" />
      </basic>
      <many-to-one name="country" target-entity="Country">
        <join-table name="LocationCountryTable">
          <join-column name="countryID">
          </join-column>
        </join-table>
      </many-to-one>
    </attributes>
  </entity>
  
  <entity class="com.signaldata.model.Operator" name="Operator">
    <table name="Operator"/>
    <attributes>
      <id name="operatorID">
        <generated-value strategy="IDENTITY"/>
      </id>
      <basic name="name">
        <column name="Name"/>
      </basic>
      <many-to-many name="countries" target-entity="Country">
        <join-table name="OperatorCountryTable">
          <join-column name="operatorID">
          </join-column>
          <inverse-join-column name="countryID">
          </inverse-join-column>
        </join-table>
      </many-to-many>
    </attributes>
  </entity>
  
  <entity class="com.signaldata.model.SignalStrength" name="SignalStrength">
    <table name="SignalStrength"/>
    <attributes>
      <id name="signalStrengthID">
        <generated-value strategy="IDENTITY"/>
      </id>
      <basic name="signalStrengthValue">
        <column name="SignalStrengthValue" precision="5" scale="2" />
      </basic>
      <many-to-one name="operator" target-entity="Operator">
        <join-table name="SSOperatorTable">
          <join-column name="operatorID">
          </join-column>
        </join-table>
      </many-to-one>
      <many-to-one name="location" target-entity="Location">
        <join-table name="SSLocationTable">
          <join-column name="locationID">
          </join-column>
        </join-table>
      </many-to-one>
      <many-to-one name="technology" target-entity="Technology">
        <join-table name="SSTechnologyTable">
          <join-column name="technologyID">
          </join-column>
        </join-table>
      </many-to-one>
    </attributes>
  </entity>
  
  <entity class="com.signaldata.model.Technology" name="Technology">
    <table name="Technology"/>
    <attributes>
      <id name="technologyID">
        <generated-value strategy="IDENTITY"/>
      </id>
      <basic name="name">
        <column name="Name"/>
      </basic>
    </attributes>
  </entity>
  
</entity-mappings>
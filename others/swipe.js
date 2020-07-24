import Swipeout from "react-native-swipeout";

// const EditButton = () => {
  return (
    <View style={styles.editButton}>
      <Avatar.Icon size={24} icon="delete" />
    </View>
  );
};

var swipeoutBtns = [
  {
    text: "Delete",
    type: "delete",
    backgroundColor: "lightpink",
    color: "red",
    onPress: () => console.log("delete clicked"),
  },
  {
    text: "edit",
    type: "primary",
    backgroundColor: "lightgrey",
    color: "blue",
    component: <EditButton />,
    onPress: () => console.log("edit clicked"),
  },
];


function TestComp() {
  return (
    <Swipeout right={swipeoutBtns} backgroundColor="lightblue" autoClose={true}>
      //{" "}
      <Card style={{ height: 70, padding: 10, margin: 10 }}>
        // <Text>Swipe me left</Text>
        //{" "}
      </Card>
      //{" "}
    </Swipeout>
  );
}

export default TestComp;
